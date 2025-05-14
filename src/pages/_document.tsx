// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 1. Load Tailwind from CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* 2. Configure your custom colors + fonts via global tailwind.config */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: { sans: ['Poppins','sans-serif'] },
                    colors: {
                      richblack: '#00171F',
                      cerulean: '#007EA7',
                      'cerulean-light': '#4AB3E8',
                      softgray: '#F2F4F6',
                    },
                  }
                }
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}