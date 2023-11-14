/**
 * Create a random di
 */
export const getRandomUniqueID = (length = 10) => {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const increment = Math.floor(Math.random() * 0 * 100000).toString(16);
  
    const paddedIncrement = increment.padStart(5, "0");
  
    const userId = paddedIncrement + timestamp;
  
    return userId;
  };
  
  /**
   * Create a Slug
   */
   export const createSlug = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const cleanedSlug = slug.replace(/[^a-zA-Z0-9]/g, "");
  
    return cleanedSlug;
  };
  