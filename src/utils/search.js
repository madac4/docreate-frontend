export const searchUser = (users, searchTerm) => {
    if (!searchTerm) {
        return users;
    }

    const filtered = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered;
};

export const searchDocument = (documents, searchTerm) => {
    if (!searchTerm) {
        return documents;
    }

    const filtered = documents.filter((document) =>
        document.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered;
};
