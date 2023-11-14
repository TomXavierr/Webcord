import axios from "axios";

export const createServer = async (serverName, iconFile, userId) => {
    try {
        const accessToken = localStorage.getItem("access");

        const formData = new FormData();
        formData.append("name", serverName);
        formData.append("owner", userId); // Add owner field
        if (iconFile) {
            formData.append("icon", iconFile);
        }

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/server/servers/create/`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        // You can return the response data if needed
        return response.data;
    } catch (error) {
        console.error("Error creating server:", error.message);
        throw error;
    }
};
