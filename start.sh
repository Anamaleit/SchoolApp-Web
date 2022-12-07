trap "kill 0" SIGINT
cd backend
npm run dev &
cd ../frontend
npm start &
wait
