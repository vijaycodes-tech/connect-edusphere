package com.smartschool.connect;

import com.smartschool.connect.models.ERole;
import com.smartschool.connect.models.Role;
import com.smartschool.connect.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
@EnableDiscoveryClient
public class ConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConnectApplication.class, args);
    }

    @Bean
    public CommandLineRunner initialRoles(RoleRepository roleRepository) {
        return args -> {
            if (roleRepository.count() == 0) {
                Arrays.stream(ERole.values()).forEach(eRole -> {
                    roleRepository.save(new Role(eRole));
                });
            }
        };
    }
}
