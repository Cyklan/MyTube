# Projektstruktur

## Web

- Login / registrierung
- Adminpanel
- Video hochladen
- Video anschauen
- Video suchen
- Video verwalten
- Kanäle
- Startseite

### Login / registrierung

- auth mit email / passwort
- http requests mit json web token
- registrierung abschaltbar

### Adminpanel

- Videos löschen
- benutzer löschen
- benutzer anlegen
- benutzer admin machen
- passwörter ändern
- registrierung aktivieren / deaktivieren

### Video hochladen

- video auf eigenen kanal hochladen
- Titel
- beschreibung
- sichtbar / nicht sichtbar

### Video anschauen

- video player controls
- link zu kanal
- kanal abonnieren

### Video suchen

- suchleiste
- fuzzy search

### Video verwalten

- eigene video metadaten bearbeiten
  - titel
  - beschreibung
  - sichtbarkeit
  - neuer videolink
- löschen
- runterladen

### Kanäle

- Videoübersicht aller auf dem kanal hochgeladenen videos

### Startseite

2 Feeds
- neuste videos auf der plattform
- neueste videos von abonnierten accounts

## Backend

- auth handler
- admin actions
- video ingestion / conversion
- search
- video crud api
- subscription handler
