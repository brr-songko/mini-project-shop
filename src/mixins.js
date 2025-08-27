import axios from 'axios';

export default {
    methods: {
        /**
         * $api
         * @param {string} url - 요청 URL
         * @param {object} data - 요청 바디 (POST) 또는 params (GET)
         * @param {string} method - 'get' | 'post' (기본 'post')
         * @returns {Promise<any>} - 응답 데이터
         */
        async $api(url, data = {}, method = 'post') {
            try {
                const config = {
                    url,
                    method: method.toLowerCase()
                };

                if (method.toLowerCase() === 'get') {
                    config.params = data; // GET은 params
                } else {
                    config.data = data;   // POST/PUT 등은 data
                }

                const res = await axios(config);
                return res.data;
            } catch (e) {
                console.error('API 호출 오류:', e);
                return null; // 필요하면 throw e로 상위에서 처리 가능
            }
        },

        $base64(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        },

        $currencyFormat(value, format = '#,###') {
            if (value == 0 || value == null) return 0;
            let currency = format.substring(0, 1);
            if (currency === '$' || currency === '|') format = format.substring(1);
            else currency = '';

            let groupingSeparator = ',';
            let decimalSeparator = '.';
            let maxFractionDigits = 0;

            if (format.indexOf('.') !== -1) {
                if (format.indexOf(',') < format.indexOf('.')) {
                    groupingSeparator = ',';
                    decimalSeparator = '.';
                    maxFractionDigits = format.length - format.indexOf('.') - 1;
                } else {
                    groupingSeparator = '.';
                    decimalSeparator = ',';
                    maxFractionDigits = format.length - format.indexOf(',') - 1;
                }
            }

            let prefix = '';
            let d = '';
            let dec = 1;
            for (let i = 0; i < maxFractionDigits; i++) dec *= 10;

            let v = String(Math.round(parseFloat(value) * dec) / dec);
            if (v.startsWith('-')) {
                prefix = '-';
                v = v.substring(1);
            }

            if (maxFractionDigits > 0 && format.endsWith('0')) v = parseFloat(v).toFixed(maxFractionDigits);

            if (maxFractionDigits > 0 && v.includes('.')) {
                d = v.substring(v.indexOf('.')).replace('.', decimalSeparator);
                v = v.substring(0, v.indexOf('.'));
            }

            v = v.replace(/\D/g, '');
            const r = /(\d+)(\d{3})/;
            while (r.test(v)) v = v.replace(r, `$1${groupingSeparator}$2`);

            return prefix + currency + v + d;
        }
    }
};
