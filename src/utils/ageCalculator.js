export const calculateAge = (dob) => {
    try {
      const today = new Date();
      const [day, month, year] = dob.split("/");
      const birthDate = new Date(year, month - 1, day);
      const ageInMilliseconds = today - birthDate;
      const ageDate = new Date(ageInMilliseconds);
      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      return `${years}y ${months}m`;
    } catch (error) {
      console.error("Error calculating age:", error);
      return "";
    }
  };