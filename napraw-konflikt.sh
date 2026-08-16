#!/usr/bin/env bash
# =============================================================================
#  Ateny Roztocza — usunięcie konfliktów w pull requeście
#
#  Problem: gałąź 'seo-poprawki' powstała ze starszego stanu projektu
#  (z 4 sierpnia), a od tego czasu na gałęzi 'main' pojawiły się 42 nowe
#  commity. GitHub nie potrafi tego pogodzić automatycznie.
#
#  Rozwiązanie: budujemy gałąź od nowa — na najświeższym stanie 'main' —
#  i nakładamy na nią wyłącznie poprawki SEO. Konflikty znikają u źródła,
#  bo nie ma już czego godzić.
#
#  Uruchom w Codespace:   bash napraw-konflikt.sh
# =============================================================================

set -Eeuo pipefail

STARA="seo-poprawki"
NOWA="seo-poprawki-v2"

G=$'\e[32m'; Y=$'\e[33m'; R=$'\e[31m'; B=$'\e[1m'; N=$'\e[0m'
krok()  { printf "\n${B}▶ %s${N}\n" "$1"; }
zrob()  { printf "  ${G}✓${N} %s\n" "$1"; }
info()  { printf "  ${Y}•${N} %s\n" "$1"; }
blad()  { printf "\n${R}✖ BŁĄD: %s${N}\n" "$1" >&2; }

trap 'blad "Skrypt zatrzymał się w linii $LINENO. Nic nie zostało zmienione na GitHubie."' ERR

krok "Sprawdzam katalog projektu"
if [[ ! -f astro.config.mjs || ! -d src/pages ]]; then
  blad "To nie jest katalog projektu."
  echo "   Wpisz najpierw:  cd /workspaces/AR-import"
  exit 1
fi
zrob "Katalog projektu: $(pwd)"

if [[ ! -f napraw-seo.sh ]]; then
  blad "Brak pliku napraw-seo.sh w tym katalogu."
  echo "   Ten skrypt korzysta z napraw-seo.sh — proszę go najpierw wgrać."
  exit 1
fi

git config user.name  >/dev/null 2>&1 || git config user.name  "Codespaces"
git config user.email >/dev/null 2>&1 || git config user.email "codespaces@users.noreply.github.com"

krok "Pobieram najświeższy stan projektu z GitHuba"
git fetch --quiet origin main
zrob "Pobrano ($(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0) nowych commitów względem bieżącej gałęzi)"

krok "Zabezpieczam bieżący stan"
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  git stash push -q -m "przed-naprawa-konfliktu" || true
  info "Niezapisane zmiany odłożono na bok (git stash)"
else
  zrob "Brak niezapisanych zmian"
fi

# Zachowaj skrypty w miejscu odpornym na przełączanie gałęzi
TMPDIR_SKRYPTY=$(mktemp -d)
cp napraw-seo.sh "$TMPDIR_SKRYPTY/" 2>/dev/null || true
cp napraw-konflikt.sh "$TMPDIR_SKRYPTY/" 2>/dev/null || true

krok "Tworzę nową gałąź na najświeższym stanie 'main'"
if git show-ref --verify --quiet "refs/heads/$NOWA"; then
  info "Gałąź '$NOWA' już istnieje — tworzę ją od nowa"
fi
# -B tworzy lub resetuje gałąź, także gdy jesteśmy właśnie na niej
git checkout -q -B "$NOWA" origin/main
zrob "Gałąź '$NOWA' utworzona na $(git log -1 --format=%h origin/main) (aktualny main)"

cp "$TMPDIR_SKRYPTY/napraw-seo.sh" . 2>/dev/null || true
cp "$TMPDIR_SKRYPTY/napraw-konflikt.sh" . 2>/dev/null || true

krok "Nakładam poprawki SEO na czysty, aktualny kod"
echo "  (to potrwa 2–4 minuty — proszę poczekać)"
echo ""

# Starsze wersje napraw-seo.sh mają nazwę gałęzi wpisaną na sztywno i
# przełączyłyby się z powrotem na starą gałąź. Podmieniamy ją w kopii roboczej.
SEO_RUN="$TMPDIR_SKRYPTY/napraw-seo-uruchom.sh"
sed -E 's/^BRANCH=.*/BRANCH="'"$NOWA"'"/' napraw-seo.sh > "$SEO_RUN"
if ! grep -q "^BRANCH=\"$NOWA\"" "$SEO_RUN"; then
  blad "Nie rozpoznano wersji pliku napraw-seo.sh."
  echo "   Proszę wgrać najnowszą wersję napraw-seo.sh i spróbować ponownie."
  exit 1
fi

BRANCH="$NOWA" bash "$SEO_RUN"

# Kontrola: czy nadal jesteśmy na właściwej gałęzi?
AKTUALNA=$(git branch --show-current)
if [[ "$AKTUALNA" != "$NOWA" ]]; then
  info "Wracam na gałąź '$NOWA' (byliśmy na '$AKTUALNA')"
  git checkout -q "$NOWA"
fi

krok "Sprawdzam, czy nowa gałąź zawiera poprawki"
LICZBA_ZMIAN=$(git diff --name-only origin/main "$NOWA" -- . ':!napraw-seo.sh' ':!napraw-konflikt.sh' 2>/dev/null | wc -l)
if [[ "$LICZBA_ZMIAN" -lt 10 ]]; then
  blad "Gałąź '$NOWA' zawiera tylko $LICZBA_ZMIAN zmienionych plików (oczekiwano co najmniej 10)."
  echo "   Poprawki nie zostały nałożone na właściwą gałąź."
  echo "   Proszę upewnić się, że plik napraw-seo.sh jest w najnowszej wersji,"
  echo "   i przysłać mi ten komunikat."
  exit 1
fi
zrob "Gałąź zawiera $LICZBA_ZMIAN zmienionych plików"

krok "Sprawdzam, czy konflikty faktycznie zniknęły"
if git merge-tree "$(git merge-base "$NOWA" origin/main)" "$NOWA" origin/main 2>/dev/null | grep -q "^<<<<<<<"; then
  blad "Nadal wykryto konflikt. Proszę przysłać mi ten komunikat."
  exit 1
fi
zrob "Brak konfliktów — gałąź scali się automatycznie"

printf "\n${G}${B}══════════════════════════════════════════════════════════${N}\n"
printf "${G}${B}  GOTOWE — nowa gałąź bez konfliktów${N}\n"
printf "${G}${B}══════════════════════════════════════════════════════════${N}\n"
cat <<PODSUMOWANIE

  ${B}Co dalej — dwa kroki:${N}

  1) Wyślij nową gałąź na GitHuba:

       git push -u origin $NOWA

  2) Otwórz nowy pull request:

       https://github.com/Witek232/AR-import/compare/main...$NOWA

     Kliknij ${B}Create pull request${N}, a potem ${B}Merge pull request${N}.
     Tym razem komunikat o konfliktach się NIE pojawi.

  ${B}Stary pull request${N} (ten z konfliktami) proszę zamknąć przyciskiem
  ${B}Close pull request${N} — jest już niepotrzebny.

PODSUMOWANIE
