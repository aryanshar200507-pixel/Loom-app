package com.jobtracker.auth.service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final Resend resend;

    @Value("${app.mail.from}")
    private String fromAddress;

    public EmailService(@Value("${resend.api.key}") String apiKey) {
        this.resend = new Resend(apiKey);
    }

    public void sendResetEmail(String to, String link) {
        try {
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(fromAddress)
                    .to(to)
                    .subject("Password Reset - JobTracker")
                    .text("Click the link below to reset your password:\n\n" + link +
                          "\n\nThis link expires in 15 minutes.")
                    .build();

            resend.emails().send(params);

        } catch (ResendException e) {
            throw new RuntimeException("Failed to send reset email: " + e.getMessage());
        }
    }
}