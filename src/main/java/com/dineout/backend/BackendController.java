package com.dineout.backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendController {

    @RequestMapping("/hello")
    public String hello() {

        return ("hello change");
    }
}
