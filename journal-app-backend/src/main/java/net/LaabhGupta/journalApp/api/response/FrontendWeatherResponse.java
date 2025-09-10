// src/main/java/net/LaabhGupta/journalApp/api/response/FrontendWeatherResponse.java
package net.LaabhGupta.journalApp.api.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class FrontendWeatherResponse {
    private String temperature;
    private String description;
    private String icon;
    private String city;
    private String feelslike;
}