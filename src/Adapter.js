class Adapter {
  static getUser(id) {
    return fetch(`${Adapter.api}/users/${id}`).then(res => res.json());
  }

  static getUsers() {
    return fetch(`${Adapter.api}/users`).then(res => res.json());
  }

  static newDoc(userId) {
    return fetch(`${Adapter.api}/users/${userId}/documents/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: "New Document" })
    }).then(res => res.json());
  }

  static deleteDoc(userId, docId) {
    return fetch(`${Adapter.api}/users/${userId}/documents/${docId}`, {
      method: "DELETE"
    }).then(res => res.json());
  }

  static getDoc(userId, id) {
    return fetch(`${Adapter.api}/users/${userId}/documents/${id}`).then(res =>
      res.json()
    );
  }

  static getDocVersions(userId, id) {
    return fetch(
      `${Adapter.api}/users/${userId}/documents/${id}/versions`
    ).then(res => res.json());
  }

  static updateDocTitle(userId, doc, title) {
    return fetch(`${Adapter.api}/users/${userId}/documents/${doc.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
  }

  static saveVersion(userId, docId, versionData) {
    return fetch(`${Adapter.api}/users/${userId}/documents/${docId}/versions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: versionData })
    }).then(res => res.json());
  }

  static revertToVersion(userId, docId, versionId) {
    return fetch(
      `${Adapter.api}/users/${userId}/documents/${docId}/revert/${versionId}`,
      { method: "PATCH" }
    ).then(res => res.json());
  }
}

Adapter.api = "http://localhost:3000";
export default Adapter;
