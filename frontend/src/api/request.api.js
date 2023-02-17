import http from 'api/http.api';

export const getUsers = () => {
    return http.get('/user');
}

export const deleteUser = (id) => {
    return http.delete(`/user/${id}`);
}

export const register = (data) => {
    return http.post(`/register`, data);
}

export const login = (credential) => {
    return http.post(`/login`, credential);
}

export const getBooks = () => {
    return http.get('book');
}
export const postBook = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('image', data.image);
    formData.append('price', data.price);
    formData.append('discount', data.discount);
    return http.post('/book', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const deleteBook = (id) => {
    return http.delete(`/book/${id}`);
}
export const getBanners = () => {
    return http.get('banner');
}
export const postBanner = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('image', data.image);
    formData.append('expire_date', data.expire_date);
    return http.post('/banner', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const deleteBanner = (id) => {
    return http.delete(`/banner/${id}`);
}


export const getCategories = () => {
    return http.get('category');
}
export const postCategory = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    return http.post('/category', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const deleteCategory = (id) => {
    return http.delete(`/category/${id}`);
}

export const getAuthors = () => {
    return http.get('author');
}
export const postAuthor = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', JSON.stringify(data.address)); // Append the address object as a JSON string
    return http.post('/author', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const deleteAuthor = (id) => {
    return http.delete(`/author/${id}`);
}