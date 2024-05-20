# Примечание

При разработке на Nuxt новой версии заметил неработающий `typeCheck` в конфиге Nuxt. А так же ошибку типов из `storeToRefs` метода pinia. Проверка на типы выдаст ошибку, но приложение билдится и работает. На данный момент ресерчу способ решить проблему с типами.
Так же я не использовал Transition для анимаций. Могу добавить при необходимости.

# Вопросы

1. Почему в интерфейсах прилагаемых в описании тестового задания другие типы? Например: `accuracy` -> `mapping_accuracy`. Как я понял изначальные имена значений приходящие из API были изменены. Для чего эта трансформация? В текущей реализации поменял нейминг в соответствии с API схемой.
2. При клике на "Reverse" кнопку (экшн который вызывает смену FROM -> TO) в данной реализации я меняю только валюту, необходимо ли так же менять амаунт? Я посмотрел в референсах и там это реализовано по-разному. Как правило в большинстве проектов я делал именно смену валют без амаунта.
3. Когда мы получаем `ICalculationResponse` мы имеем `amount` и `amountFrom` типа `string`, но в `ICalculationRequest` мы отдаем `amount` типа `number`. Этот момент тоже не могу понять. Почему если мы получаем Decimal то мы не можем и отдавать в Decimal? Этот вопрос уже скорее не к клиент сайду.

Если я получу ответы на вопросы могу внести соответствующие изменения для более корректного выполнения ТЗ.

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
