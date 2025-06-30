# New note in single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: the user inputs the note and click on save

    Note right of browser: the browser executes the javascript form submit handler, that adds the new note to the local list of notes and rerenders the notes.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa {"content": note_content, "date": note_date}
    activate server
    server-->>browser: {"message": "note created"}
    deactivate server
```