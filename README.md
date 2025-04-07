# Welcome to CryptoGuide app 👋

## Get started
### *Disclaimer*  The APK build is unable to load environment variables, which is why we've set the default landing page to Main. However, when using the Expo Go app, everything functions as expected.
1. Install dependencies

   ```bash
   npm install
   ```

2. The production environment will not work since our EC2 Instance is not running. You will have to configure the .env.development file.
3. You will have to change the host here for these 2: *EXPO_PUBLIC_API_URL=* and *EXPO_PUBLIC_PAYMENT_ENDPOINT=*. This is how the Expo Go connects with the computer.
4. In order to change the host you will have to follow this instruction:
5. Open a terminal or Command Prompt on your computer and run: On Windows: ipconfig On Mac/Linux: ifconfig (or ip a for Linux) Look for the IPv4 address under your active network connection (usually labeled as Ethernet or Wi-Fi). It will typically look like 192.168.x.x or 10.x.x.x.
6. Put the IP as a host for *EXPO_PUBLIC_API_URL=* and *EXPO_PUBLIC_PAYMENT_ENDPOINT=* values.

   ```bash
    npm start
   ```

## Alternative Approach

1. Clone the application from git using this link: https://github.com/andreea-cazac/Crypto_Guide_React.git
2. Install dependencies

```bash
npm install
```

3. Create .env.development file and fill it with these values :
<p> EXPO_PUBLIC_API_URL=http://192.168.178.90:8080/  </p>
<p> EXPO_PUBLIC_PAYMENT_ENDPOINT=http://192.168.178.90:8080/stripe/payment-sheet </p>
<p> EXPO_PUBLIC_STRIPE_PRICE_ID=price_1R1U1o4gHyUjWEHaEqEYcyHd </p>
<p> EXPO_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51R1TfJ4gHyUjWEHad8KKs0w8q1msqh8iEWSirif59NCU7M4DE9rzgEbzJKPZTHoWxZCbxeM0vVp7NpEnYQxideL200Ehim3DC9 </p>

4. Repeat the same actions as above with changing the values for EXPO_PUBLIC_API_URL values and EXPO_PUBLIC_PAYMENT_ENDPOINT values the host have to be changed as mentioned in the instruction above. 


### Important Note

The .env.development file in the end will have this values (for EXPO_PUBLIC_API_URL values and EXPO_PUBLIC_PAYMENT_ENDPOINT values the host have to be changed as mentioned in the instruction) :
<p> EXPO_PUBLIC_API_URL=http://192.168.178.90:8080/  </p>
<p> EXPO_PUBLIC_PAYMENT_ENDPOINT=http://192.168.178.90:8080/stripe/payment-sheet </p>
<p> EXPO_PUBLIC_STRIPE_PRICE_ID=price_1R1U1o4gHyUjWEHaEqEYcyHd </p>
<p> EXPO_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_51R1TfJ4gHyUjWEHad8KKs0w8q1msqh8iEWSirif59NCU7M4DE9rzgEbzJKPZTHoWxZCbxeM0vVp7NpEnYQxideL200Ehim3DC9 </p>

These credentials are not sensitive since we are using testing methods for Stripe.

Locally using Expo Go and connecting via Expo Go app with your phone will work. 

The backend has to run in order for the frontend to work further than Login screen.