## Introduction

A template for a system that contains session control through the iron session library. In addition to user and product cruds.

Main libraries and frameworks

- TypeScript
- NextJs
- Tailwind CSS
- Iron Session
- Shadcn ui
- Prism
  
## Important Note

How is a Nextjs 14 project, you have to use node version 20 or superior

## Getting Started

1. Clone project

```
git clone https://github.com/NodUp/admin-template.git
```

2. Install all dependencies

```
npm i
```

3. Creat a postgres database

```
db name: template
user: postgresql
password: 123
```

4. Run migrations

```
npx prisma migrate dev --name init
```

5. Run seeds

```
npx prisma db seed
```
   
6. Run project

```
npm run dev
```

7. Login project

```
login: admin@template.com.br
password: 123456
```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
