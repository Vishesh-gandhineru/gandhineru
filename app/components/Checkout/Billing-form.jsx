import { WOOCOMMERCE_STATES_ENDPOINT } from "@/app/utils/constants/endpoints";
import axios from "axios";
import React, { useState } from "react";

const BillingForm = ({ countriesData, setInput }) => {
  const shippingCountries = countriesData.shippingCountries;

  const [states, setStates] = useState([]);
  const [isStateReady, setIsStateReady] = useState(false);

  const handleCountryChange = (event) => {
    console.log(event.target.value);
    let code = event.target.value;
    const url = `${WOOCOMMERCE_STATES_ENDPOINT}?countryCode=${code}`;
    axios
      .get(url)
      .then((res) => {
        setStates(res.data.states);
        setIsStateReady(true);
        setInput((prev) => ({
          ...prev,
          billing: {
            ...prev.billing,
            [event.target.name]: event.target.value,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateAccount = (event) => {
    if (event.target.checked) {
      setInput((prev) => {
        return { ...prev, createAccount: true };
      });
    } else {
      setInput((prev) => {
        return { ...prev, createAccount: false };
      });
    }
  };

  const handleBillingChange = (event) => {
    setInput((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        [event.target.name]: event.target.value,
      },
      shipping: {
        ...prev.shipping,
        [event.target.name]: event.target.value,
      },
    }));
  };

  return (
    <div className="checkoutForm billingDetailForm">
      <div className="flex flex-row gap-10">
        <label htmlFor="fName" className="w-1/2">
          first name
          <input
            type="text"
            name="firstName"
            id="fName"
            required
            className="input input-bordered w-full"
            onChange={handleBillingChange}
          />
        </label>
        <label htmlFor="lName" className="w-1/2">
          Last Name name
          <input
            type="text"
            name="lastName"
            id="lName"
            required
            className="input input-bordered w-full"
            onChange={handleBillingChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="Country">
          Country / Regoin
          <select
            name="country"
            id="countries"
            className="select select-bordered w-full"
            onChange={handleCountryChange}
          >
            {shippingCountries.map((item) => {
              return (
                <option key={item.countryCode} value={item.countryCode}>
                  {item.countryName}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="streetAddress">
          Street Address
          <input
            type="text"
            name="address1"
            id="houseNumber"
            className="input input-bordered w-full"
            placeholder="House number and street name"
            onChange={handleCountryChange}
          />
          <input
            type="text"
            name="address2"
            id="ApartmentNumber"
            className="input input-bordered w-full"
            placeholder="Apartment, suite , unit ,etc"
            onChange={handleCountryChange}
          />
        </label>

        <label htmlFor="townandcity">
          Town / City
          <input
            type="text"
            name="city"
            id="townAndCity"
            className="input input-bordered w-full"
            placeholder="Town / City"
            onChange={handleCountryChange}
          />
        </label>
      </div>

      <div>
        {isStateReady && (
          <div>
          <label htmlFor="states">
            State
            <select
              name="state"
              id="states"
              className="select select-bordered w-full"
              onChange={handleBillingChange}
            >
              {states.map((item) => {
                return (
                  <option key={item.stateCode} value={item.stateName}>
                    {item.stateName}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="postcode">
          Postcode / ZIP
          <input
            type="text"
            name="postcode"
            id="postcode"
            className="input input-bordered w-full"
            placeholder="postcode"
            onChange={handleBillingChange}
          />
        </label>
          </div>
          
        )}
      </div>

      <div>
        <label htmlFor="phone">
          Phone
          <input
            type="tel"
            name="phone"
            id="phone"
            className="input input-bordered w-full"
            placeholder="Phone"
            onChange={handleBillingChange}
          />
        </label>
        <label htmlFor="Email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            className="input input-bordered w-full"
            placeholder="Email"
            onChange={handleBillingChange}
          />
        </label>
      </div>
      <div>
        <label className="flex flex-row mt-5 gap-3 items-center">
          <input
            type="checkbox"
            className="checkbox"
            onChange={handleCreateAccount}
          />
          <span className="label-text">Create an account?</span>
        </label>
      </div>
    </div>
  );
};

export default BillingForm;
