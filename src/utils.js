
const formatDate = (dateStr) => {
    return dateStr ? new Date(Number(dateStr)).toLocaleDateString() : null;
};

module.exports = {
    formatDate,
}