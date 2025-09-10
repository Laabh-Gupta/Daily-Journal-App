package net.LaabhGupta.journalApp.controller;

import net.LaabhGupta.journalApp.api.response.FrontendWeatherResponse; // <-- Ensure this import is correct
import net.LaabhGupta.journalApp.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{city}")
    // CHANGE THE RETURN TYPE HERE
    public ResponseEntity<FrontendWeatherResponse> getWeather(@PathVariable String city) {
        // AND CHANGE THE VARIABLE TYPE HERE
        FrontendWeatherResponse weatherData = weatherService.getWeather(city);
        if (weatherData != null) {
            return new ResponseEntity<>(weatherData, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}