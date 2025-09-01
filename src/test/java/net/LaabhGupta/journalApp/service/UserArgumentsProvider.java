package net.LaabhGupta.journalApp.service;

import net.bytebuddy.asm.MemberSubstitution;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;
import net.LaabhGupta.journalApp.entity.User;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Stream;

public class UserArgumentsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext extensionContext) throws Exception{
        return Stream.of(
                Arguments.of(User.builder().userName("Vedica").password("Vedica").roles(Arrays.asList("USER", "ADMIN")).build()),
                Arguments.of(User.builder().userName("Laabh").password("Laabh").roles(Arrays.asList("USER", "ADMIN")).build())
        );
    }
}
