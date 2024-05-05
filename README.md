# AVTO-POLNILNICE BACKEND

## NAVODILA ZA UPORABO
- pozene z "npm start"/"npm run dev"
- lokalno nahaja na localhost:3000
- osnovno testno vracanje z "http://localhost:3000/polnilnice/test"
- na serverju test: http://52.174.127.46:3000/polnilnice/test
- lokalno zaganjanje dockerja v terminalu: docker build -t backend . && docker run -p 3000:3000 backend
- zaganjanje dockerja na serverju: docker ./run_docker upgrade (ali ./run_docker run|drun|dupgrade -> drun in dupgrade sta za debuggiranje, run in upgrade pa za zagon brez konzole)
- 

### TODO:
- vzpostaviti API za vracanje podatkov
- vzpostaviti podatkovno bazo
- polnjenje baze