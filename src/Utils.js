/**
 * Utils
 *
 * @author Gabriel Consalter
 * @since 1.0.0
 */
const Utils = {
	/**
	 * @function guid
	 *
	 * @return {string} A generated guid
	 */
	guid: () => {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16)
				.substring(1);
		}

		return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
	}
};

export default Utils;