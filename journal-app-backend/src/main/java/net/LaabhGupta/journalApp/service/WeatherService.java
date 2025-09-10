package net.LaabhGupta.journalApp.service;

import net.LaabhGupta.journalApp.api.response.FrontendWeatherResponse;
import net.LaabhGupta.journalApp.api.response.WeatherResponse;
import net.LaabhGupta.journalApp.cache.AppCache;
import net.LaabhGupta.journalApp.constants.Placeholders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey; // Your key here

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AppCache appCache;

    public FrontendWeatherResponse getWeather(String city) {
        String finalApiUrl = appCache.appCache.get(AppCache.keys.WEATHER_API.toString()).replace("<city>", city).replace(Placeholders.API_KEY, apiKey);

        try {

            String requestBody = "{\n"+
                    "    \"userName\":\"Vipul\",\n"+
                    "    \"password\":\"vipul\"\n+"+
                    "}  ";

            HttpEntity<String> httpEntity = new HttpEntity<>(requestBody);
            // 1. Let RestTemplate map the response to your detailed WeatherResponse POJO
            ResponseEntity<WeatherResponse> response = restTemplate.exchange(
                    finalApiUrl,
                    HttpMethod.GET,
                    null,
                    WeatherResponse.class
            );

            WeatherResponse weatherData = response.getBody();

            // 2. Transform the complex object into the simple one for the frontend
            if (weatherData != null && weatherData.getCurrent() != null && weatherData.getLocation() != null) {
                FrontendWeatherResponse frontendResponse = new FrontendWeatherResponse();
                frontendResponse.setTemperature(String.valueOf(weatherData.getCurrent().getTemperature()));
                frontendResponse.setCity(weatherData.getLocation().getName());

                // Safely get the first description and icon
                if (weatherData.getCurrent().getWeatherDescriptions() != null && !weatherData.getCurrent().getWeatherDescriptions().isEmpty()) {
                    frontendResponse.setDescription(weatherData.getCurrent().getWeatherDescriptions().get(0));
                }
                if (weatherData.getCurrent().getWeatherIcons() != null && !weatherData.getCurrent().getWeatherIcons().isEmpty()) {
                    frontendResponse.setIcon(weatherData.getCurrent().getWeatherIcons().get(0));
                }

                frontendResponse.setFeelslike(String.valueOf(weatherData.getCurrent().getFeelslike()));

                return frontendResponse;
            }
            return null; // Or handle error appropriately

        } catch (Exception e) {
            System.err.println("Error fetching weather data: " + e.getMessage());
            return null;
        }
    }
}