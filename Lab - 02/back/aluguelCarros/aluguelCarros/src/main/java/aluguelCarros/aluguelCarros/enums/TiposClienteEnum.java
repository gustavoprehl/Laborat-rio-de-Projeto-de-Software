package aluguelCarros.aluguelCarros.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TiposClienteEnum {
    
    PESSOA(1, "PESSOA"),
    EMPRESA(2,"EMPRESA"),
    BANCO(3, "BANCO");

    private Integer code;
    private String description;

}
