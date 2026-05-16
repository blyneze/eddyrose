export function calculateAge(dob: string | Date | null | undefined): string | null {
  if (!dob) return null;
  
  const birthDate = new Date(dob);
  const today = new Date();
  
  if (isNaN(birthDate.getTime())) return null;

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 0 ? `${age} years old` : null;
}
