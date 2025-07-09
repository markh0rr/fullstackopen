deployPhonebookFrontend:
	@echo "[*] building frontend and move the result to the backend dist/ ..."
	@cd ./part2/phonebook && npm run build
	@rm -rf part3/phonebook/dist/
	@cp -r part2/phonebook/dist/ part3/phonebook/dist/