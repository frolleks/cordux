import axios from 'axios';

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  try {
    const response = await axios.post('https://discord.com/api/v9/auth/login', {
      email,
      password,
      code,
    });
    const token = response.data.token;
    // Your success code here
  } catch (error) {
    // Your error code here
  }
};
