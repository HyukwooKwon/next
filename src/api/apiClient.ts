import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://gagell.ngrok.io/api", // 백엔드 REST API 기본 URL
    timeout: 5000, // 요청이 5초 내에 응답 없으면 타임아웃
});

// 필요시 헤더 추가
apiClient.defaults.headers.common["Content-Type"] = "application/json";

export default apiClient;
