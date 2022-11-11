const storage = {
  set(key, value) {
    if (
      typeof value === 'object' ||
      Array.isArray(value) ||
      Number.isInteger(value) ||
      isNaN(value)
    ) {
      value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
  },
  get(key, defaultValue) {
    const data = localStorage.getItem(key);

    try {
      let parsed = JSON.parse(data);

      return parsed !== null ? parsed : defaultValue;
    } catch (e) {
      return data !== null ? data : defaultValue;
    }
  },
  remove(key) {
    return localStorage.removeItem(key);
  },
  clear() {
    return localStorage.clear();
  },
};

export default storage;
