export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

export const formatGender = (genderCode) => {
  return genderCode === 0 ? 'Pria' : 'Wanita';
};
