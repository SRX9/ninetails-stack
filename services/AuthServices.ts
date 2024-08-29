import { verifyPassword } from "@/lib/password";
import { getDBPool } from "@/Database/dbClient";

interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string; // Assuming you store hashed passwords
  emailVerified?: Date | null;
  image?: string | null;
}

export const getUserFromDb = async (
  email: string,
  passwordHash: string
): Promise<User | null> => {
  const pool = getDBPool();

  try {
    const client = await pool.connect();
    const query = `
      SELECT id, name, email, "emailVerified", image, password
      FROM users
      WHERE email = $1
    `;

    const result = await client.query(query, [email]);
    client.release();

    if (result.rowCount === 0) {
      return null; // User not found
    }

    const user = result.rows[0];

    // Compare the provided password hash with the stored password hash
    const isPasswordValid = await verifyPassword(passwordHash, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    // Return the user object without the password
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user?.emailVerified,
      image: user?.image,
      passwordHash: user.password,
    };
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null; // In case of an error, return null to indicate failure
  }
};
