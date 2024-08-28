FROM mcr.microsoft.com/playwright:v1.44.1-jammy

WORKDIR /playwright-tests

COPY . .

RUN npm install

CMD ["npx", "playwright", "test", "form_validation.qauto.spec.ts", "--project=qauto"]