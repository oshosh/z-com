export default function Default() {
  return null;
}

// localhost:3000 인경우 layout의 children은 page.tsx이고 modal은 default.tsx
// localhost:3000/i/flow/login 인경우 layout의 children은 /i/flow/login/page.tsx이고 modal은 @modal/i/flow/login/page.tsx