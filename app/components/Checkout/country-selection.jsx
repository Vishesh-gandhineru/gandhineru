import Error from './error';
import {isEmpty, map} from "lodash";
import Abbr from "./form-elements/abbr";


const CountrySelection = ({input, handleOnChange, countries, isShipping}) => {
	
	const {country, errors} = input || {};
	
	const inputId = `country-${isShipping ? 'shipping' : 'billing'}`;
	
	return (
		<div className="mb-3">
			<label className="leading-7 text-sm text-gray-700" htmlFor={inputId}>
				Country
				<Abbr required/>
			</label>
			<div className="relative w-full border-none">
				<select
					onChange={handleOnChange}
					value={country}
					name="country"
					className="bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
					id={inputId}
				>
					<option value="">Select a country...</option>
					{!isEmpty(countries) &&
					map(countries, (country) => (
						<option key={country?.countryCode} data-countrycode={country?.countryCode}
						        value={country?.countryCode}>
							{country?.countryName}
						</option>
					))}
				</select>
				
			</div>
			<Error errors={errors} fieldName={'country'}/>
		</div>
	);
}

export default CountrySelection;