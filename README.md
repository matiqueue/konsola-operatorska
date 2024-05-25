# Konsola Operatorska

## Opis

Konsola Operatorska to aplikacja webowa, która fetchuje dane z `localhost:8080/radios` za pomocą REST API i uzupełnia je do tabeli. Dane te są następnie przedstawiane na mapie OpenStreetMap, która prezentuje bliskie urządzenia w okolicy wraz z informacjami takimi jak poziom baterii, nazwa, ID itp. Aplikacja posiada wiele różnych funkcji, takich jak tryb ciemny (dark mode) i tryb jasny (light mode).

## Jak uruchomić aplikację

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

1. Sklonuj repozytorium:
   ``` sh
   git clone https://github.com/Spiritus13/konsola-operatorska.git ./
   ```

2. Przejdź do katalogu projektu:
   ``` sh
   cd konsola-operatorska
   ```

3. Zainstaluj zależności:
   ``` sh
   npm install
   ```

4. Uruchom aplikację w trybie deweloperskim:
   ``` sh
   npm run dev
   ```

## Technologia

Aplikacja została zbudowana z użyciem następujących technologii:

- **Vite**
- **React**
- **TypeScript**
- **schad/cn**
- **Tailwind CSS**
- **Vercel**

## Stylizacja

Stylizacja aplikacji została wykonana za pomocą Tailwind CSS oraz zmiennych CSS.

## Autorzy

- Szymon Góral
- Maksymilian Januszek
- Patryk Smutek
- Oliwia Wolak
- Patryk Kajda
- Szymon Białek
- Michał Gomułka

## Przeznaczenie

Aplikacja została stworzona dla firmy Motorola jako część praktyk.

## Pakiety instalacyjne

- **npm**
- **npx**

## Licencja

Szczegóły dotyczące licencji znajdują się w pliku `LICENSE.md`.

## Struktura aplikacji

Aplikacja składa się z dwóch głównych folderów:

- **public**: zawiera zdjęcia używane w aplikacji.
- **src**: zawiera assety, komponenty, bibliotekę oraz kod aplikacji.

## Podgląd aplikacji

Podgląd aplikacji jest dostępny pod adresem: [konsola-operatorska.vercel.app](https://konsola-operatorska.vercel.app/).
