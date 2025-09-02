
Calcoli fighissimi sono un nerd

<pre> ```r
# Lookup table P_hit base, da mod = -8 a +8
p_hit_table <- c(
  0.23, 0.27, 0.31, 0.345, 0.38,
  0.415, 0.445, 0.475, 0.5,
  0.525, 0.555, 0.585, 0.62,
  0.655, 0.685, 0.715, 0.75
)
names(p_hit_table) <- -8:8

# Funzione per calcolare P_hit dato mod e grado di vantaggio (n dadi)
get_p_hit_adv <- function(mod, n = 1) {
  mod <- max(min(mod, 8), -8)
  p <- p_hit_table[as.character(mod)]
  return(1 - (1 - p)^n)
}

#Funzione
ETTK<- function(Destrezza, dmg = 0, vantaggio = 0, danno_base = 8) {
  mod_effettivo <- Destrezza
  dmg_totale <- danno_base + dmg
  
  p_hit_base <- get_p_hit_adv(mod_effettivo, 1)
  
  if (vantaggio > 0) {
    n_tiri <- vantaggio + 1
    # Probabilità di almeno un successo su n_tiri (vantaggio)
    p_hit_effettiva <- 1 - (1 - p_hit_base)^n_tiri
  } else if (vantaggio < 0) {
    n_tiri <- abs(vantaggio) + 1
    # Probabilità che tutti i tiri abbiano successo (svantaggio)
    p_hit_effettiva <- p_hit_base^n_tiri
  } else {
    # vantaggio = 0, nessun vantaggio/svantaggio, 1 tiro
    p_hit_effettiva <- p_hit_base
  }
  
  killprob_build <- p_hit_effettiva * dmg_totale / 35
  ettk_build <- 1 / killprob_build
  
  # Baseline: mod 0, nessun vantaggio/svantaggio (1 tiro)
  p_hit_base_baseline <- get_p_hit_adv(0, 1)
  killprob_base <- p_hit_base_baseline * danno_base / 35
  ettk_base <- 1 / killprob_base
  
  aumento_velocita <- (1 - ettk_build / ettk_base) * 100
  aumento_velocita <- round(aumento_velocita, 1)
  
  cat(sprintf("- Base turn to kill: %.2f\n- Turns to kill: %.2f\n- \"%s più veloce della baseline\"\n",
              ettk_base, ettk_build, paste0(aumento_velocita, "%")))
}

ETTK(7, 4, 1)

``` </pre>
