# Tickets

## 💻 Project

<p>
Tickets é uma plataforma prática que permite aos usuários criar eventos,
adicionando fotos, endereços a até mesmo latitude e longitude do local especifico. Com esta aplicação, criar um evento nunca foi tão simples e acessível.
</p>

## ✨ Technologies used

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Supabase](https://supabase.com/)
- [Jest](https://jestjs.io/)
- [Zod](https://zod.dev/)

### Request

<p>User</p>
<span>Create User</span>

```bash
POST /events/:event_id/participants
```

```bash
{
	"name": "Bruce Wayne",
	"email": "bruce@email.com"
}
```

<span>Return Example</span>

```bash
{
	"participants": {
		"id": "65152807104b18d08e1ca5ef",
		"name": "Bruce Wayne",
		"email": "bruce@email.com"
	}
}
```

<span>Create Event</span>

```bash
POST /events
```

```bash
{
	"title": "fake-title"
  "description": "fake-description"
  "city": "fake-city"
  "address": "fake-address"
  "categories": "fake-category"
  "location": "-23,60005, -46,72016"
  "coupons": "fake-coupon"
  "price': 45000
  "sector": "fake-sector"
  "date": "2023-11-08T07:17:26.603Z"
  "banner": "image.png"
  "flyers": "image.png"
}
```

<span>Return Example</span>

```bash
{
	"id": "6524f274fc87ec18e0327908",
	"user_id": null,
	"title": "Queens of the Stone Age",
	"description": "Show de rock",
	"categories": [
		"show",
		" rock"
	],
	"city": "São Paulo",
	"address": "Praça Roberto Gomes Pedrosa",
	"location": [
		"-23.60005",
		" -46.72016"
	],
	"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/62c0f69a-cf22-4a26-b9f3-eac7ec9e3e7f-bruce_wayne.jpeg",
	"flyers": [
		"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/9f54404c-3e4c-4154-aa37-9c64962cf95a-bruce_wayne.jpeg"
	],
	"coupons": [
		"SUPER10",
		" EQUIPE20"
	],
	"price": 45000,
	"sector": "pista",
	"date": "2023-10-10T06:42:57.407Z",
	"created_at": "2023-10-10T06:43:00.216Z"
}
```

<span>Find Events</span>

```bash
GET /events
```

<span>Return Example</span>

```bash
[
	{
		"id": "6524f1e9fc87ec18e0327907",
		"user_id": null,
		"title": "Moto club",
		"description": "Evento de moto",
		"categories": [
			"moto",
			" corrida"
		],
		"city": "São Paulo",
		"address": "Praça Roberto Gomes Pedrosa",
		"location": [
			"-23.60005",
			" -46.72016"
		],
		"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/6f45f260-4867-4b9c-8c69-98cabf729bfb-harley2.jpeg",
		"flyers": [
			"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/0ccda94d-785d-4dd6-b198-d3e4ed3ed2b6-harley2.jpeg"
		],
		"coupons": [
			"SUPER10",
			" EQUIPE20"
		],
		"price": 45000,
		"sector": "pista",
		"date": "2023-10-11T06:40:35.936Z",
		"created_at": "2023-10-10T06:40:41.390Z"
	},
	{
		"id": "6524f274fc87ec18e0327908",
		"user_id": null,
		"title": "Queens of the Stone Age",
		"description": "Show de rock",
		"categories": [
			"show",
			" rock"
		],
		"city": "São Paulo",
		"address": "Praça Roberto Gomes Pedrosa",
		"location": [
			"-23.60005",
			" -46.72016"
		],
		"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/62c0f69a-cf22-4a26-b9f3-eac7ec9e3e7f-bruce_wayne.jpeg",
		"flyers": [
			"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/9f54404c-3e4c-4154-aa37-9c64962cf95a-bruce_wayne.jpeg"
		],
		"coupons": [
			"SUPER10",
			" EQUIPE20"
		],
		"price": 45000,
		"sector": "pista",
		"date": "2023-10-10T06:42:57.407Z",
		"created_at": "2023-10-10T06:43:00.216Z"
	}
]
```

<span>Filter Event By ID</span>

```bash
GET /events/:event_id
```

<span>Return Example</span>

```bash
{
	"id": "650e8fe8e7a1cd70ef4263b6",
	"user_id": null,
	"title": "Queens of the stone age",
	"description": "Show de rock",
	"categories": [
		"rock",
		" show"
	],
	"city": "São Paulo",
	"location": [
		"-23.60005",
		" -46.72016"
	],
	"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/c109b13b-8023-4626-aa89-00b222fb81a3-bruce_wayne.jpeg",
	"flyers": [
		"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/3c8be3f1-ba3b-4689-b0d3-69cba30bd551-bruce_wayne.jpeg"
	],
	"coupons": [
		"SUPER10",
		" EQUIPE20"
	],
	"price": 45000,
	"sector": "pista",
	"date": "2023-09-23T07:12:37.234Z",
	"created_at": "2023-09-23T07:12:40.498Z"
}
```

<span>Filter Event By Name</span>

```bash
POST /events/filter/name
```

```bash
{
	"name": "moto"
}
```

<span>Return Example</span>

```bash
[
	{
		"id": "6524f1e9fc87ec18e0327907",
		"user_id": null,
		"title": "Moto club",
		"description": "Evento de moto",
		"categories": [
			"moto",
			" corrida"
		],
		"city": "São Paulo",
		"address": "Praça Roberto Gomes Pedrosa",
		"location": [
			"-23.60005",
			" -46.72016"
		],
		"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/6f45f260-4867-4b9c-8c69-98cabf729bfb-harley2.jpeg",
		"flyers": [
			"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/0ccda94d-785d-4dd6-b198-d3e4ed3ed2b6-harley2.jpeg"
		],
		"coupons": [
			"SUPER10",
			" EQUIPE20"
		],
		"price": 45000,
		"sector": "pista",
		"date": "2023-10-19T06:40:35.936Z",
		"created_at": "2023-10-10T06:40:41.390Z"
	}
]
```

<span>Filter Event by Category</span>

```bash
GET /events/category/:category
```

<span>Return Example</span>

```bash
[
	{
		"id": "65040da2a197a2aed488884c",
		"user_id": null,
		"title": "Queens of the stone age",
		"description": "Show de rock",
		"categories": [
			"rock",
			"show"
		],
		"city": "São Paulo",
		"location": [
			"-23.60005",
			"-46.72016"
		],
		"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/801ad65f-4e18-4388-a3c6-53f58ebb25e9-bruce_wayne.jpeg",
		"flyers": [
			"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/761c7090-a013-430c-9ec5-bdc67874b2e3-amy.jpeg"
		],
		"coupons": [
			"SUPER10",
			"EQUIPE20"
		],
		"price": 45000,
		"sector": "pista",
		"date": "2023-09-25T07:54:06.592Z",
		"created_at": "2023-09-15T07:54:10.870Z"
	},
	{
		"id": "65040dc2fd7e07a779d77dc1",
		"user_id": null,
		"title": "Queens of the stone age",
		"description": "Show de rock",
		"categories": [
			"rock",
			"show"
		],
		"city": "São Paulo",
		"location": [
			"-23.60005",
			"-46.72016"
		],
		"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/66fc3a9c-c75d-4f84-9a88-fa8c8d17a88a-bruce_wayne.jpeg",
		"flyers": [
			"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/53af08f3-0bf8-451c-a826-9341b4ceec7a-amy.jpeg"
		],
		"coupons": [
			"SUPER10",
			"EQUIPE20"
		],
		"price": 45000,
		"sector": "pista",
		"date": "2023-09-30T07:54:39.749Z",
		"created_at": "2023-09-15T07:54:42.503Z"
	}
]
```

<span>Filter Event by Location</span>

```bash
GET events/:location
```

<span>Return example</span>

```bash
[
	{
		"id": "650e8fe8e7a1cd70ef4263b6",
		"user_id": null,
		"title": "Queens of the stone age",
		"description": "Show de rock",
		"categories": [
			"rock",
			" show"
		],
		"city": "São Paulo",
		"location": [
			"-23.60005",
			" -46.72016"
		],
		"banner": "https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/banner/c109b13b-8023-4626-aa89-00b222fb81a3-bruce_wayne.jpeg",
		"flyers": [
			"https://znilbkcnbqxzdtipchqf.supabase.co/storage/v1/object/public/tickets-bucket/flyers/3c8be3f1-ba3b-4689-b0d3-69cba30bd551-bruce_wayne.jpeg"
		],
		"coupons": [
			"SUPER10",
			" EQUIPE20"
		],
		"price": 45000,
		"sector": "pista",
		"date": "2023-09-27T07:12:37.234Z",
		"created_at": "2023-09-23T07:12:40.498Z"
	}
]
```

# 🚀 How to run

## clone repository

```bash
git clone https://github.com/Gui-dev/beauty-salon-api
```

## Install dependencies

```bash
npm ci
```

## Run the app

npm run dev
