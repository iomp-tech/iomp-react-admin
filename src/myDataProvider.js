import { fetchUtils } from "react-admin";
import restServerProvider from 'ra-data-json-server';
import { format, isDate } from "date-fns";

export const servicesHost = 'http://127.0.0.1:8000/api';
//http://127.0.0.1:8000/api
// https://api.iomp.ru/public/api

const httpClient = (url, options = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' });
	}
	const token = sessionStorage.getItem('token');
	options.headers.set('Authorization', `Bearer ${token}`);
	return fetchUtils.fetchJson(url, options);
};

const dataProvider = restServerProvider(servicesHost, httpClient);

const myDataProfider = {
	...dataProvider,
	create: (resource, params) => {
		let formData = new FormData();

		for (let key in params.data) {
			if (key === "thumb" || key === "avatar" || key === "icon" || key === "image") {
				formData.append(key, params.data[key].rawFile);
			} else if (key === "block") {
				formData.append('block', JSON.stringify(params.data[key]));

				for (let key2 in params.data[key]) {
					if (params.data[key][key2].thumbBlock) {
						formData.append('thumb-' + key2, params.data[key][key2].thumbBlock.rawFile);
					}
				}
			} else if (key === "page") {
				for (let key2 in params.data[key]) {
					if (params.data[key][key2].type === "feedback-photos") {
						if (params.data[key][key2].photos) {
							for (let key3 in params.data[key][key2].photos) {
								formData.append('imageFeedback-' + key3, params.data[key][key2].photos[key3].imageFeedback.rawFile);
							}
						}
					}

					if (params.data[key][key2].type === "main2") {
						if (params.data[key][key2].range) {

							delete params.data[key][key2].date;

							if (isDate(params.data[key][key2].minDate)) {
								params.data[key][key2].minDate = format(params.data[key][key2].minDate, 'yyyy-MM-dd, HH:mm');
							}

							if (isDate(params.data[key][key2].maxDate)) {
								params.data[key][key2].maxDate = format(params.data[key][key2].maxDate, 'yyyy-MM-dd, HH:mm');
							}

						} else {
							if (isDate(params.data[key][key2].date)) {
								params.data[key][key2].date = format(params.data[key][key2].date, 'yyyy-MM-dd, HH:mm');
								delete params.data[key][key2].minDate;
								delete params.data[key][key2].maxDate;
							}
						}

					}

					if (params.data[key][key2].type === "composition-product") {
						if (!params.data[key][key2].formBoolean) {
							delete params.data[key][key2].form_id_awo
							delete params.data[key][key2].action
							delete params.data[key][key2].formId
							delete params.data[key][key2].formVc
						}
					}
				}

				formData.append('page', JSON.stringify(params.data[key]));
			} else if (key === "id_awo_courses") {
				formData.append('id_awo_courses', JSON.stringify(params.data[key]));
			} else if (key === "date" || key === "dateDelete" || key === "minDate" || key === "maxDate") {
				formData.append(key, format(params.data[key], 'yyyy-MM-dd, HH:mm'));

			} else if (key === "content") {
				formData.append('content', JSON.stringify(params.data[key]));

				for (let key2 in params.data[key]) {
					if (params.data[key][key2].file) {
						formData.append('file-' + key2, params.data[key][key2].file.rawFile);
					}
				}
			} else {
				formData.append(key, params.data[key]);
			}
		}

		return httpClient(`${servicesHost}/${resource}`, {
			method: 'POST',
			body: formData,
		}).then(({ json }) => {
			if (json.error) {
				sessionStorage.removeItem("token");

				return false;
			}
			return {
				data: { ...params.data, id: json.id }
			};
		});
	},
	update: (resource, params) => {
		let formData = new FormData();

		for (let key in params.data) {
			if (params.data[key]) {
				if (key === "thumb" || key === "avatar" || key === "icon" || key === "image") {
					if (params.data[key].rawFile) {
						formData.append(key, params.data[key].rawFile);
					}
				} else if (key === "phones") {
					formData.append('phones', JSON.stringify(params.data[key]));
				} else if (key === "block") {
					formData.append('block', JSON.stringify(params.data[key]));

					for (let key2 in params.data[key]) {
						if (params.data[key][key2].thumbBlock) {
							formData.append('thumb-' + key2, params.data[key][key2].thumbBlock.rawFile);
						}
					}
				} else if (key === "page") {
					for (let key2 in params.data[key]) {
						if (params.data[key][key2].type === "feedback-photos") {
							if (params.data[key][key2].photos) {
								for (let key3 in params.data[key][key2].photos) {
									formData.append('imageFeedback-' + key3, params.data[key][key2].photos[key3].imageFeedback.rawFile);
								}
							}
						}
						if (params.data[key][key2].type === "main2") {
							if (params.data[key][key2].range) {

								delete params.data[key][key2].date;

								if (isDate(params.data[key][key2].minDate)) {
									params.data[key][key2].minDate = format(params.data[key][key2].minDate, 'yyyy-MM-dd, HH:mm');
								}

								if (isDate(params.data[key][key2].maxDate)) {
									params.data[key][key2].maxDate = format(params.data[key][key2].maxDate, 'yyyy-MM-dd, HH:mm');
								}

							} else {
								if (isDate(params.data[key][key2].date)) {
									params.data[key][key2].date = format(params.data[key][key2].date, 'yyyy-MM-dd, HH:mm');
									delete params.data[key][key2].minDate;
									delete params.data[key][key2].maxDate;
								}
							}

						}

						if (params.data[key][key2].type === "composition-product") {
							if (params.data[key][key2].formBoolean) {
								delete params.data[key][key2].block_id_awo;
								delete params.data[key][key2].blockTitle;
								delete params.data[key][key2].blockDescription;
								delete params.data[key][key2].blockBtnText;
							} else {
								delete params.data[key][key2].form_id_awo
								delete params.data[key][key2].action
								delete params.data[key][key2].formId
								delete params.data[key][key2].formVc
							}
						}
					}

					formData.append('page', JSON.stringify(params.data[key]));
				} else if (key === "date" || key === "dateDelete" || key === "minDate" || key === "maxDate") {
					if (isDate(params.data[key])) {
						formData.append(key, format(params.data[key], 'yyyy-MM-dd, HH:mm'));
					}
				} else if (key === "content") {
					formData.append('content', JSON.stringify(params.data[key]));

					for (let key2 in params.data[key]) {
						if (params.data[key][key2].file) {
							formData.append('file-' + key2, params.data[key][key2].file.rawFile);
						}
					}
				} else {
					formData.append(key, params.data[key]);
				}
			}
		}

		formData.append("_method", "PUT");

		return httpClient(`${servicesHost}/${resource}/${params.data.id}`, {
			method: 'POST',
			body: formData,
		}).then(({ json }) => ({ data: { ...params.data, id: json.id } }));
	},
	getOne: (resource, params) => {
		return httpClient(`${servicesHost}/${resource}/${params.id}`).then(({ json }) => ({ data: json }));
	}
};

export default myDataProfider;