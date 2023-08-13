import { AUTHENTICATION_TOKEN, BASE_URL } from "@/constants/config";

interface ServiceOptions {
    url: string;
    method: string;
    params?: Record<string, any>;
    data?: Record<string, any>;
}

interface ErrorData {
    status: string;
    statusCode: number;
    message: string;
    ok: false;
}

interface SuccessData<T> {
    status: string;
    statusCode: number;
    message: string;
    ok: true;
    data: T;
}

async function service<T>({ url, method, params, data }: ServiceOptions): Promise<SuccessData<T | null>> {
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
        throw new Error(`Invalid HTTP method: ${method}`);
    }

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AUTHENTICATION_TOKEN}`, // Add the Authorization header
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    let requestUrl = `${BASE_URL}${url}`;
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        requestUrl += `?${queryString}`;
    }

    try {
        const response = await fetch(requestUrl, options);

        if (!response.ok) {
            const errorData: ErrorData = {
                status: 'error',
                statusCode: response.status,
                message: `HTTP request failed with status ${response.status}`,
                ok: false,
            };
            throw errorData;
        }

        // handle response untuk delete, karena tidak return data 😭
        if (method === 'DELETE') {
            const successData: SuccessData<null> = {
                status: 'success',
                statusCode: response.status,
                message: 'Request successful',
                ok: true,
                data: null,
            };
            return successData;
        }

        const responseData: T = await response.json();

        const successData: SuccessData<T> = {
            status: 'success',
            statusCode: response.status,
            message: 'Request successful',
            ok: true,
            data: responseData,
        };
        return successData;
    } catch (error) {
        throw error;
    }
}

export { service };
