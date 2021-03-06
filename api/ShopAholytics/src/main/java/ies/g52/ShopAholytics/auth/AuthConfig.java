package ies.g52.ShopAholytics.auth;

import com.fasterxml.jackson.databind.ObjectMapper;

import ies.g52.ShopAholytics.repository.UserRepository;
import ies.g52.ShopAholytics.services.ShoppingManagerService;
import ies.g52.ShopAholytics.services.StoreManagerService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.validation.MessageCodesResolver;
import org.springframework.validation.Validator;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import ies.g52.ShopAholytics.repository.UserRepository;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private UserRepository userRepository;
    private StoreManagerService storeManagerService;
    private ShoppingManagerService shoppingManagerService;

    public AuthConfig(UserDetailsServiceImpl userDetailsServiceImpl, UserRepository userRepository, StoreManagerService storeManagerService, ShoppingManagerService shoppingManagerService) {
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.userRepository = userRepository;
        this.storeManagerService = storeManagerService;
        this.shoppingManagerService = shoppingManagerService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsServiceImpl);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8000"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowCredentials(false);
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("X-Auth-Token", "Authorization", "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"));

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource()).and().csrf().disable()
                .authorizeRequests()

                //PUBLIC
                .antMatchers(HttpMethod.POST, AuthConsts.LOG_IN_URL).permitAll()
                .antMatchers(AuthConsts.PUBLIC_ENDPOINTS).permitAll()

                .antMatchers(AuthConsts.SHOPPING_MANAGER_PROTECTED_ENDPOINTS).hasAuthority(AuthConsts.SHOPPING_MANAGER)
                .anyRequest().authenticated()
                .and()

                .exceptionHandling()
                .authenticationEntryPoint(
                    (req, res, ex) -> {
                        Map<String, Object> body = new HashMap<>();
                        body.put("error", "Access denied");
                        body.put("timestamp", new Date().toString());
                        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);

                        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
                        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        new ObjectMapper().writeValue(res.getWriter(), body);
                    } 
                )
                .accessDeniedHandler(
                    (req, res, ex) -> {
                        Map<String, Object> body = new HashMap<>();
                        body.put("error", "Forbidden resource");
                        body.put("timestamp", new Date().toString());
                        body.put("status", HttpServletResponse.SC_FORBIDDEN);
                                        
                        res.setContentType(MediaType.APPLICATION_JSON_VALUE);
                        res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                        new ObjectMapper().writeValue(res.getWriter(), body);
                    }
                )
                .and()

                .addFilterBefore(new JWTAuthenticationFilter(authenticationManager(), this.userRepository, this.storeManagerService, this.shoppingManagerService), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthorizationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }


    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {

    }

   @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {

    }

    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer) {

    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {

    }

    @Override
    public void addFormatters(FormatterRegistry registry) {

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")    // Paths that allow cross domain access
                .allowedOrigins("*")    // Sources that allow cross domain access
                .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")    // Allow request method
                .maxAge(168000)    // Pre inspection interval
                .allowedHeaders("*")  // Allow head setting
                .allowCredentials(false);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {

    }

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {

    }
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {

    }

    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> returnValueHandlers) {

    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {

    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {

    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {

    }

    @Override
    public void extendHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {

    }

    @Override
    public Validator getValidator() {
        return null;
    }

    @Override
    public MessageCodesResolver getMessageCodesResolver() {
        return null;
    }
}
