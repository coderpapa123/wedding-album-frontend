import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = "https://wedding-album.onrender.com/api";

  constructor() {}

  async login(data: any) {
    return axios.post(`${this.API_URL}/auth/login`, data);
  }

  async register(data: any) {
    return axios.post(`${this.API_URL}/auth/register`, data);
  }

  // Albums
  async getAlbums() {
    return axios.get(`${this.API_URL}/albums`, this.getAuthHeader());
  }

  async createAlbum(data: any) {
    return axios.post(`${this.API_URL}/albums`, data, this.getAuthHeader());
  }

  async deleteAlbum(id: string) {
    return axios.delete(`${this.API_URL}/albums/${id}`, this.getAuthHeader());
  }

  // Upload Image
  async uploadImage(image: File) {
    const formData = new FormData();
    formData.append("image", image);
    return axios.post(`${this.API_URL}/upload`, formData, this.getAuthHeader());
  }

  // Users
  async getUsers() {
    return axios.get(`${this.API_URL}/users`, this.getAuthHeader());
  }

  async deleteUser(id: string) {
    return axios.delete(`${this.API_URL}/users/${id}`, this.getAuthHeader());
  }

  async updateUser(id: string, user: User) {
    return axios.put(`${this.API_URL}/users/${id}`, user, this.getAuthHeader());
  }

  private getAuthHeader() {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  }
}
