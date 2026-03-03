package com.jobtracker.auth.securityconfig;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access.expiration.ms}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh.expiration.ms}")
    private long refreshTokenExpiration;

    public String generateAccessToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts email from token. Returns null if token is expired or invalid
     * (so JwtFilter can return 401 instead of throwing 500).
     */
    public String extractEmail(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            return null; // Caller should return 401
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Validates token signature, expiry, and subject match.
     * NOTE: was previously passing `email` instead of `token` to parseClaimsJws — now fixed.
     */
    public boolean isTokenValid(String token, String email) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(token)  // ✅ Fixed: was incorrectly `email` before
                    .getBody();

            return claims.getSubject().equals(email)
                    && claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}