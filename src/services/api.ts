import axios from 'axios';

const BASE_URL = 'govt-conntect-backend.vercel.app/api';

// ======================== Public Schemes ========================
export const fetchSchemes = async (filters: Record<string, string> = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const res = await axios.get(`${BASE_URL}/schemes?${params}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching schemes:', err);
    throw err;
  }
};

export const fetchSchemeById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/schemes/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error fetching scheme:', err);
    throw err;
  }
};

// ======================== Chat API ========================
export const sendChatMessage = async (prompt: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/chat`, { prompt });
    return res.data.reply;
  } catch (err) {
    console.error('Error sending chat message:', err);
    throw err;
  }
};

// ======================== Admin APIs ========================
export const adminLogin = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/login`, { username, password });
    return res.data;
  } catch (err) {
    console.error('Admin login error:', err);
    throw err;
  }
};

export const adminFetchSchemes = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/schemes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching admin schemes:', err);
    throw err;
  }
};

export const adminAddScheme = async (schemeData: any, token: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/schemes`, schemeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error('Error adding scheme:', err);
    throw err;
  }
};

export const adminUpdateScheme = async (id: string, schemeData: any, token: string) => {
  try {
    const res = await axios.put(`${BASE_URL}/admin/schemes/${id}`, schemeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error('Error updating scheme:', err);
    throw err;
  }
};

export const adminDeleteScheme = async (id: string, token: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/admin/schemes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error('Error deleting scheme:', err);
    throw err;
  }
};

// ======================== USER AUTH APIs ========================
export const registerUser = async (userData: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/register`, userData);
    return res.data;
  } catch (err) {
    console.error('User registration error:', err);
    throw err;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error('User login error:', err);
    throw err;
  }
};

// ======================== USER SAVED SCHEMES ========================
export const saveUserScheme = async (schemeId: number, token: string) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/saved-schemes/save`,
      { scheme_id: schemeId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    console.error('Error saving user scheme:', err);
    throw err;
  }
};

export const deleteUserSavedScheme = async (schemeId: number, token: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/saved-schemes/${schemeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error('Error deleting saved scheme:', err);
    throw err;
  }
};

export const fetchUserSavedSchemes = async (token: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/saved-schemes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error('Error fetching saved schemes:', err);
    throw err;
  }
};
