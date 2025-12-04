
export const generateInitials = (name) => {
  const words = name.split(' ');
  return words[0][0].toUpperCase() + (words.length > 1 ? words[1][0].toUpperCase() : '');
};