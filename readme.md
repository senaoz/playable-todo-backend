# ToDo Uygulaması

Bu proje, React.js kullanılarak oluşturulmuş bir ToDo uygulamasıdır. Kullanıcılar giriş yapabilir, kendi ToDo listelerini görüntüleyebilir ve düzenleyebilirler. JWT token kullanılarak kullanıcı yetkilendirme işlemleri gerçekleştirilir. Resim ve dosya yükleme özellikleri bulunmaktadır.

## Kullanılan Teknolojiler

- React.js
- TypeScript
- SCSS
- Express.js
- PostgresSQL
- JWT (JSON Web Token)

## Frontend Kurulum

Projeyi yerel bilgisayarınıza klonlayın:

```bash
git clone <repository_url>
cd todo-app
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Projeyi başlatın:

```bash
npm start
```

## Interfaces
```typescript
interface Todo {
    id: string;
    title: string;
    description: string;
    image: string;
    status: boolean;
    dueDate: string;
    tags: string[];
}

interface User {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}
```

## API Endpoints

### `POST /api/login`

- **Request Body**: { email: string, password: string }
- **Response**: { token: string }

### `POST /api/verify-token`

- **Request Body**: { token: string }
- **Response**: { valid: boolean }

### `GET /api/todos`
- **Request Header**: { Authorization: string }
- **Response**: { todos: Todo[] }

### `POST /api/todos`
- **Request Header**: { Authorization: string }
- **Request Body**: { title: string, description: string, image: File, file: File }
- **Response**: { todo: Todo }

### `PUT /api/todos/:id`
- **Request Header**: { Authorization: string }
- **Request Body**: { title: string, description: string, image: File, file: File }
- **Response**: { todo: Todo }

### `DELETE /api/todos/:id`
- **Request Header**: { Authorization: string }
- **Response**: { message: string }
- **Error Response**: { message: string }
- **Error Message**: "Todo not found"

## Veritabanı Kurulum

Veritabanı olarak **PostgreSQL** kullanılarak **todo_db** adında bir veritabanı oluşturulmuştur.

- PostgreSQL'i başarıyla kurduktan sonra, bir veritabanı ve bu veritabanına bağlanacak bir kullanıcı oluşturmalısınız. 

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE todo_app;
CREATE USER todo_user WITH ENCRYPTED PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo_user;
```

Bu komutlarla **todo_app** adında bir veritabanı oluşturulur ve **todo_user** adında bir kullanıcı tanımlanır. Kullanıcıya **todo_app** veritabanına tam erişim izni verilir.

### Veritabanı Bağlantısı

Veritabanı bağlantısı için yukaridaki bilgileri config dosyasına eklenmiştir. 

`server.js` dosyasını çalıştırarak server'ı başlatabilirsiniz.

```bash
node server.js
```



