import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';

export default withPageAuthRequired(function CompleteAccount() {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="first-name">First Name:</label>
                    <input type="text" id="first-name" name="first-name" required />
                </div>
                <div>
                    <label htmlFor="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last-name" required />
                </div>
                <div>
                    <label htmlFor="region">Region:</label>
                    <select id="region" name="region" required>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Australia">Australia</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
})