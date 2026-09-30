// Corpo da assinatura: tabelas + estilos inline, sem depender de CSS global.
// Compatibilidade máxima com e-mails (Gmail, Outlook, Apple Mail).

const FONT = "Arial, Helvetica, sans-serif";
const TEXT = "#000000";
const MUTED = "#1a1a1a";
const BG_COLOR = "#d9cab1";

export type SignatureData = {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string; // URL completa ou @identificador
  linkedin: string; // URL completa
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const hasValue = (value: string) => value.trim() !== "";
const isUrl = (value: string) => /^https?:\/\//i.test(value);

function telHref(phone: string) {
  const plus = phone.trim().startsWith("+") ? "+" : "";
  return `tel:${plus}${onlyDigits(phone)}`;
}

function whatsappHref(whatsapp: string) {
  return `https://wa.me/${onlyDigits(whatsapp)}`;
}

function instagramHref(instagram: string) {
  const value = instagram.trim();
  if (isUrl(value)) return value;
  return `https://www.instagram.com/${value.replace(/^@/, "")}/`;
}

function linkedinHref(linkedin: string) {
  return linkedin.trim();
}

// Elementos institucionais fixos da BRACCI.
// PENDÊNCIA: Facebook, YouTube e Pinterest utilizam links "#" temporariamente
// até que as URLs institucionais oficiais sejam confirmadas pela diretoria.
const company = {
  site: "bracci.com.br",
  siteHref: "https://bracci.com.br",
  facebookHref: "#",
  youtubeHref: "#",
  pinterestHref: "#",
  // Logo sólida preta conforme layout aprovado pela diretoria.
  logoSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAAUCAYAAAC+sgIEAAADzklEQVR4nL2aW4hOURTHf59LcikeKIpijNwijZA7UW7lFlJuSS7l+sIo9/LiQQllXF/wRCSJJHfy4DYxJskYSYNSPIzcZj4v69Sx7HPOPnvv8a9d39l7rf9eZ6+919lr768AnAf6kA/NgAagFqgEbgOXlUx34AzQFijk4C4CdcBT4DpwKadtGqXAFqAlsAt45cgzFBgLDAdKgFYWOgXgHrAsoX0xMAQYBHS0tOOT2AFwH+ggv+8ggxeivFSdjgnE+87yJZPwOcblOjGuer6DxjxPvv7C808/oZxZBBpjBo8KzO2C8QaepFViwqwmsL0yAN9/cWYRWNJEznyW05H9PCdGmn6e8jzG+TwQZ4mNM9/nHLCuBsId0qadOT0n9ypHJ0TYlzIY5Rb6Jr0DOW2Io9zA9xMY4MGZ6szXDoQDFcduqdfOHOfAvV9xlFrqjbaY3SNT9Fcb5Kc52B+H5jvsyWfi9HZmL8WxTepDOLOn4lhuqdeg9I4DF1XdkxT9OiU7x8H2ODYovnpPvgjBnblMccyQ+hDO1PZttJAvSwnPun6qRZ95w7sJNYqvXwBOtJ0tUgTfAO1TcsSCtMdxGrgQyFAMYbXGQueRep4d+70COBJ7vmSRA7tMcA2dk74IwGmEaWXq0GlTKhVviJW5V3H0zpC/oORNG7pqJbMrY0x8Nj0RPsT4fgXgi2AVZl2cqUOSrzPn5Ax33SzlhxvkBqcMUmhnhgjbEazC7Cv5aLfJCLOdgPWqvhzYk2LAQ8Pg2eBQRnu1ej6WIFcHVEjqE+EU0DdBfiawNoedJvz21LeG7waoJGFFJK1Ml9V+M8OGuTk2PUllaYqOL+4qvkkBOLENs96kAZ250qH/KIV54PiJqFD1ExzHJULaDtsHVmG2KRCF63FAZ0P4bi6nNvr2oF0G70n1/AQ4Kkn+sJw2ngQWAefUJLoGTAGu5OSL8FjCe5dY3RVgsiNfInxW5ijDjcL3WJvLBqjWMIu3JshO9JzxQwz6Q6XtpaHtrBzeu2C2ge+7pEs9HTlTw2yIEiX2PrvZegPvNoPcNyVz2mFAdiqO+MlQqDGJsDkQX2mCfUEd+SVmuG9qYlqh22PtCz1XZRyaZ43U9wU+BnQmGRcAtqXJr8B0ajDC05nIxbTuZ5PhzLYo3zpXrMtwwImAzkS+lY0efNFx4F/1BeBWSo6VhR/yd5G9hn8alMr3tC3wVS56qxz6qJJ8FjlAr5f+NgOt5UVq5DDABwclxYn+EjMMeKtkxki/ZSKXhSJwA5if0N5Ddt4L5F1s8EFuqpBjwWjDeOMPsISV/LBQaVcAAAAASUVORK5CYII=",
  // Fatia da onda orgânica lateral direita.
  waveSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAB2CAYAAAC+jwHXAAAFQklEQVR4nNWc308cVRTHP3dmYWWhYIUYarSyEKwmrSwUm/ij+gql7WPjk76p0Qf/Gfukbz752Kb8iPpgTDSCdgXRRKgLlkr9QVvpgtKyOzM+cMcuy+7OHTRzD9+EMOzc2f1w7r1n7pxz7qqFmUsBBnrqufPq3z/CK1RFg0avVb9OAIECfAIUSu06WVMpE0iAxa8vX9SHHuDWODZR2L6s/415YKZ/+Nx8FKwxKPBmjLZRcgAfmAQWgyCItGoc0DiWM32/54HmIIgefc7//OGmCoAS0AF0FvLjx6NgbYEqoEn/HgMOE2FUW6CVygEZz/MaNpIA2gN0Lc1O9DXqftugLtAOnASOSAZFu6nXgfZyuVy3kQRQB2gFTv08NzVQz6oSQAHSwDDQ4fu1J5UUUIBXgO5CfuJkrZOSQFuAN4C2Wq5KEqgLPKPvVL3VJyWBol3VINDt+/6uE9JA24B3gJZqVyUNFCADvFztqiSCusDpHVf1oPslgirgJaCrkB8/EVpVIqiruV4FOiSDenphnQPaQ58qEdTVP08Ah5dnJ48FQSASNFQaeBZ4BKEWRU8oBbwGtPqBJxY0VAtwqHB1IisdtAnIAhnpoBngSaBJOig6SKKkg3oa9CHpoADNgHcQQH3AkQ7q6hiVeIv6GnTrIICuA7500G1gBXClg5aAW0BROugGUOwbOntdOuhHwJbjKLGrp/Cp7jvd9WJBHeAGsJEdGFlUSq5FAVaBdcfdScZIBv0U+DvMP8XJMyUlD7gPfJnNjU47+i4v0aKBtmbRdR/k4CSCekAeKFamHSWC+sB0Njc6Lxm0DFwC1lOp3dNHIuhl4I/qbLM00AJws29obKn6hCTQe8CVnXu7Q3W+SYIf9bXB1oDPsrnRmVpFBhIsGpruE2At5TbVbCQB1NHrzq+ATZTsFOPvwHLf0NhCvdoSCaAe8B5w22nw9G4b1ANuAtd6ciPfNqrUsQ0KsABsppzakyiUbVAX+AC4HRWus+lHy8D3wK3ewTM/RDW2Xff0OfCX4ziRlWQ2655cYBpYNykitAVaBn4BbjTynZWyBVoC3gdKjXxnpWyBFvWS7lcTa2IR9DdgtXfwzHXTC2yAbgNfAKryKTNKNkDvAR/H6XYsgV4FNmo9bjRS0qAlHaFbi2NNLIBu6QJsY7cUKmnQIrDSN3j2x7gXJgUall9c3Aklxut2EgR1dYRuBbgbd3yScNevAsXswOjifi5OEvQOsOHsM2OUJOg1oLSfbidB0LJee3rSQRWwDNzd7xsk2fWqIn8UW0mCGu2bqqck/WimevtVHCVp0RPAw8Ce2KeJkgR9EThUXbtsqiRBs0CL73lGe+yqlSTo48DTy3NTp/wgvlWTXD05wLtA90/fXDkW9w2SnPUKeBQYATo9z4s1qZJeOKeAC0BvIT8+GOfCpEED7aLeAtq8cuPta5VKGtTRw+A4cHRpdsJ4rNqKlLQCLwBdpuPUZtjxAtBkegOwBepqqzYX8uO90nfausBRvViJlM2uD4AjuuA6UjazIo7eDFB/j2VV4wMhm6BBnM+3CRqGeYxyXbYtum7a2PZkuq9jpkaNbSkF/AkEkvNM6Gf8O3qsRsomaEmXaBjd7G13PT0DI0ZhSNsOf9v0edQ2qLFsTyZj2faj6eW5qT1b1Os1tqWyXjxnJC+cqdikKn49mtagKekWVUAXkDYJ8dp2T6eBdL2v/KhUnLqnzf+EtFdNQCfw2NLs5ED/8Pm5RmuTOKBvV/SAX+M49Ismx5VaAUpR36JlDNo/fO5D07ZGUgr0JFJKEUQM1H8A17xs/jHTKbUAAAAASUVORK5CYII=",
};

// Ícones vetorizados com círculo de contorno fino conforme aprovado.
const icons = {
  whatsapp: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAABLAAAASwAc4jpUgAAAAd0SU1FB+oJHg0SHKLwb1YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDktMzBUMTM6MTg6MjArMDA6MDBDDe/aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA5LTMwVDEzOjE4OjIwKzAwOjAwMlBXZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOS0zMFQxMzoxODoyOCswMDowMFaqON4AAASQSURBVFjD7ddraNVlHAfwz5m72abTYTVzhpmr6GYNTcRUJN90A0O6GVaURUQRQWBREb6pURgRvQkpSO1OEZEVBV3IC2jZlWxZm9kspzbX5tnFbefpRf/z3znunO1v9bLfefPwe77n931+z/O7/flfxpBUYmSFiU5QKmVQr249/x1BrUaNzlRvivFS+nT4zY++ssMBmX/j3zjnesAWBw0JI36H7dRknop/av5UazTL5Jgc1K/fQB7Nr55x/vFfUakr3G+uEjCg1U9atekWVJlqpplmGR+hm631knTys0+wWnt0wg5vudl5qvIQFc5wtfV+j1BdnnJyUvOTPK5PEPR71+UmFEVWWmCjbkEwZKP6JOarPRqZb/eQExN4e4vdMcWYXpS4R48g+MlypQl9Xmh7RLE2fpcistReQdDisqQ3CubaIQj+dNNosCneFwR/WHEcOf63LNYiCL5xZnHQnfoEQx5Vfpzm4Q5pQcbjxa623mZBsM2MWFdtpSa3m5iAYJLXBcHPLigMuF6/oMetsabcw7oFXa5K5MMlDgqCBwtdcLmXBcEOdbFuSZxur6pMQFAV+bDF5KyqJN6cZg7YpD3SlFrmpGi9QGMCgrR3DGCW80YSzDYFXbYJkabC7Bz6K41LQPGVX1A7/ArDBA1qsEdrDrwsZ31Ooodu1YJSDVnLWYKUaVJotz8GD2qJ1z3e05mAoEsbOCVbwbIEldGzdOqKwf0+MhitX7AxvrrRpV3ApGxQZAlKo77Ulwf+2E4QfKs7kXnSMqjMJluWIBOdNT8H91gnjZRbRysAeVIihUzW3yzB0agfVeU9LK94DTR6SG0ighol6DGQTzCgA0w+xswRTTYj5VqP5O1VqisQuCWmgUMjx5rb9AlaCiTUxX6I+tt6syLdOPfaYo1zcwId6qJ61jTStUX2C/pdV8DtZVEpzthupRNxjXbBkN2eMDen9i70uyDtxpFGpkRd6fmCc84yzVFV6vWhJ/2YM7jscmGMWy0I9jin0Os/JghanV3w8Rb6pOD4FeyPqhgn2yoI3ihcGpc4JMhoKlJ1ZlhrfwGCzXHtvE2voN/KwgFW7cXIwfmFAcot8pyWPE++c2m02+BzQfBZFEkFZLkuQchpOSOlwmx32WS3Vt94yuyouZzgGRlB2qrif77BEcFhi4wl49WZrjbO/DL3RAPYm2qK/SnlaUGw1fQxCfKlzKqoWe4yrzhsqk8FwbOJWsuwTLTaIUFwyIrRgPMdEPS4JbrrmZa4aIwBJqXR+mgW7HD3MZXsGLkjiurF5rvXBjsd0eZpc4uMg+XO8kiccgfcOfqnSFkUpGnfOehoTiDu87pVFpihRoUy1erNscI6PxuMMF8Wm2SH55dTfDgih/vijMw4YJ/DemVUmKzOtNhgp7c96evC5x5mvTBnHhrS5ntfazXPpaaiRF3O/rB0+th6HxT/5hwmuEitow7aa7ttfrDXYWxwgaWWOl2N6jzfOu3zifd8MfowkL2iavep97kvNEsbOgYzQYMznKZWlRK9OrRptktn8o/YcWoTTdSlyo57sP9fRpe/AIioxAKdltxIAAAAAElFTkSuQmCC",
  phone: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAABLAAAASwAc4jpUgAAAAd0SU1FB+oJHg0SHKLwb1YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDktMzBUMTM6MTg6MjArMDA6MDBDDe/aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA5LTMwVDEzOjE4OjIwKzAwOjAwMlBXZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOS0zMFQxMzoxODoyOCswMDowMFaqON4AAAI7SURBVFjD7ZfPSxRhGMc/u67jLqwtWbSxtGZC2gZ1MOnQD+tiEkaEUXjoGOk/4F/QpZOCEHSRriHVuUMdJLKgukhUHtK2H65brqGp669xu2zTvDPvgLPzCCF+5/LOOw/fzzwz8z7PO7Cjba+Q4zxJQplbYYpVKUCYa9wiqcwt84hBFmSySfOSkusocDqIadg2jhHXRNSxTwqwxrI2JiYFWPUA7JUCFD1e5gGqZABz5LUxGaplACZftTFN7JEBwARFTUySVinAGL81MbUckQJ8YkITM8d45QBV1Qy4VvIMfcFWgqouFhX7SW4E+YbcSvPKZv+Gi656G1h3LPsi14PbhV0zj8mVR1HOY0jfP9Rwz8ohR7s8ANr4biGesD+Yma6M5ajnZHncwCKjbEjnkOGdlcNPuuUfUohe23p4H6xp6rWL+7b18JoT8ohmZQvwnJbKbLx7VYEvnCNRPqunlY9kHTEGHXSSYAGTDUr+ADBJnjPWTiPFKWYZx7Suh7jJIJe5xFXOcowmDnKIOn6xttn8IvQyq+yRbpOyrraTddVekxx9fsqjQQ/TNoN1RuikBjiqlEX78ZYGP28pQjefFYM8Q3Qw7GFf4gMZfx9CiAu8cJjMsy4HADjMkKMVlWQBUEsPY1sJAGim31ZptwAABm3c5dvmAX53nSZZnjFCgTC7PfrdDx5QqDyHv0pxhX5GmWbJkcFT+x9FsD1DhDiNHKeRNEnixIgyzwAPpQD/VEWCKAYGS0zJd8Ad/df6A36RPVqS8zi4AAAAAElFTkSuQmCC",
  pin: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAABLAAAASwAc4jpUgAAAAd0SU1FB+oJHg0SHKLwb1YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDktMzBUMTM6MTg6MjArMDA6MDBDDe/aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA5LTMwVDEzOjE4OjIwKzAwOjAwMlBXZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOS0zMFQxMzoxODoyOCswMDowMFaqON4AAAJySURBVFjD7ZdPTxNBGMZ/bUiR0FJRqhAPTfHQeONq/Bf1oFEOBOIfCp+gRw564agXPBnvcKtNTPCklahRA8IXEBMNVRPTPQiBlq20hdD1oOB2Z7bMbPfIs6d9553fk5mdd2YWDnWAAhq5R4kQArYxKfprEOMcZ0lyijBQpsAXllhgzY8xniTNIkUsx1PkI2n6WsWfJ0dNgO8927zmsnd4kDFWXOF7T54UQS/4AHcpHIi3sDBIaS2Wf7rENyX831Fc1MWfIKeMt7DIEdMzSFPVMqiS1sH3sSDFlMiTpyRtm6dX3eAmWwKgQoYRBhhghAwVof03N9QNHgndy0wS3W+PMklZyJlSxYd4JXR+SqQhJ0JW8qFDIkxWIsfpcUSqZDAbIiYZao6sHo6pGXTS7ois8UPI+s6qI3KETjWDOpby12rsV1czMKk4IjH6hayEUFoVxzS6GhSFwbczSrghEiYlmciSmsEOy0JskAm69t+iTDAo5HxiR3U2hyQbxRZZhkmSZJispBCrDKniIcFn6XawiYHBprRtmYQM1SY1MHjHGUk84ig3u95jyMLys6jGS9bVBwys80IovKaKMqe1Xc/ZdipFjWucCFXGdfHQyxtlg7c6Z8F/pTCV8CZjXvDQxaySwXNbCWrqqsLFpcAVr3ho4wG7TfG7PHSpJUXFWWxqsES8FTzALTZc8RvcaRUPHTymLsXXeUJH6wYQZ97lJpTwgQ7ANX5KVs91v/AQ5J7jL6HGfW+Xdjd1M21bsHVm6PYTD9DPB9vsn/YbD3CBr1hYrOj/DagpwG1+scqozv+MTplbzBIDnnm8mCkpJLvgHqol/QElQC3tBCTYowAAAABJRU5ErkJggg==",
  instagram: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAABLAAAASwAc4jpUgAAAAd0SU1FB+oJHg0SHKLwb1YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDktMzBUMTM6MTg6MjArMDA6MDBDDe/aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA5LTMwVDEzOjE4OjIwKzAwOjAwMlBXZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOS0zMFQxMzoxODoyOCswMDowMFaqON4AAAVxSURBVFjDtdhLbJTXFQfwn8c2YJuEsYOxE0PoiuBHWqDgpBGoq4KgraK2aQPYJn2oIEKlSuzcqNm024ZXVUIb0oqI7touoiwSCapIJAEbkEiMcWpHIiYVDz/GIGwoj7ldzDfjb/CMMaT9f7tzz73n3HPOPY+P/zNKZsCTkFRjkcWqVWFcynlfGDUm/WUFJD1jjVVaJJVJSCAt7Y4xPbocc8LYw95uoW2OGham+YYctVXDg9+gyvdtt1I5uOWKfoNG3ECF+RZZotYscFu3/f5hfOa6t3jLNUFwV583vKDRApUSkU8qLdDohw7qc1cQXHVI88wOL7HBqcgAPTo1Ki3KW6pJpx5pQXDS+vsHTZlNPhcEw/ZpnEGUlVjiNSOCYFCbsumZN7koCHptjCw8E8z2oh5BcFHbdEptMCgIPvDczB0W4RnHBMEFG4qxtDgpCI5Z/sDHwwofCIJTWuJGyWKu/drR62eOx3zylBXqC5rrlktO+9SdHOUbDmrEW7ZPDdotrglGbIzRmuwzYKLoM5swYK/G2I6NhgVXtd97fIMPBWm7Y7qu0ZU7Kl3gy66dsDrm7j2C4MPs686aaJt9yp31gr6c9n+xCmO69BZ8pVWatEqiy4+di6hL/U2T237hj5OsSUcEd3XmBJbZKwgGtHu0qFvnafOZINiTi/8Sne4IjkpOMq4zJOiLWbPFgCCVZ8uEhZZbbmGUMr7pFY3apQT9sUTRpE8wZO3kxt8KgjdiSaHDhODdnPbl1jig24AB3V632jx/FbxinvcE4zFVSh0UBL+RoAxJq3DLu+7mmB5XgbOuRdbeYae63OpKz9vtn4JjrurxLZUez63e9Z4O5VZKGk2gRguu6ImZYw6C65H2O7yqDiPOOWcU9X7tMS97H9cFVMR2f+wKvqqGBBZJot9IjCWeT561U5W0t71krXVe8ra0Kr+Mv9i8HSP6kdSQMdFiZRiM9L0XCe3q8I4dLoALzuC76nX4qGBVvm4QZb7i/YyJEhh2s6CAJ6zAqAPR8RkRB4xiRczycdw0jETWRJlKdaNIh1CrGpedyaN+7DKq1Rbck3YjqnxRRE+HINyXZxokMCGNiiLChqRQZ1ke9WvqkDJU5NQKpE1kBIxKY745BZkvOo0aWy3K0Z60TQ1OuVhwzxy1SBvNRNF5d8zypLkmCtrzsOfV+7YSB5zBMtusxyWHi/htrkW443xGwBfGVFriMVdilp/Eca951Vzf8ZzLqFODcbucyPPVJOZbgpR/ZwSM6vGEWi25lMtNlHgE3PYH7FSvRk20fsnv7HcbPKIEN2ICnlaLT7ImGtNlrVnW+XsuG100oVKTR12LtP1Im6+rRsophx2PSuU8zZiIeaPUOuXolsqS1k5J181Ruu7Ii40GyyzTkBdvW4wJ+jXlKFPS9XQF5zMd0xacLVHB2T2l4BzJFJzsgVv9XrleP4iVzD9rxZhuZ40LeeksKFGlWat5OOEnU0rmDn+K69IQ9TR7zM7RVjsxo6J/PK/o741atyktfUfUtmyK0Rrt0m+8aNsyrt++vLZlkxHBVW1ZwuS1q7yuHef8NNZ4lVpqufrYvSbxH5ec9q+8xutNS3HIy4X6kGbd0fVWeBhkW8eTeYUoD+uj1v1hmt9no+MHrS/ONNm+f6qtoFkKY7bNeqP2ffP0M8XkADIy4wHkKbuiAeRzm6cfQDIb1kdtfHBWp6b7jFC/0huFbPdMRqgMmh1yNTcEHvSje4bAKgs0edGb9x8Ci4+x37PdqmiMvZ0bYydQmRtjs6sPPMZm0GCrI4buM4gf8fOHGcSzSGq1Wqunp/xKSPlEt2O6pv+VMBOnlKhWY6HFqs3F9ehnSErqy3Uc/xP8F7RSRHIggCA3AAAAAElFTkSuQmCC",
  facebook: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAABLAAAASwAc4jpUgAAAAd0SU1FB+oJHg0SHKLwb1YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDktMzBUMTM6MTg6MjArMDA6MDBDDe/aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA5LTMwVDEzOjE4OjIwKzAwOjAwMlBXZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOS0zMFQxMzoxODoyOCswMDowMFaqON4AAASCSURBVFjDvdjbb1RVFAbwX6c3oE2YYotgQUCh0BZMJNwvzwRevETl7hsQnvWlxr9BBWKMiZgIL5iYqDExagIxoZDYQkKglF6IlgJplJYW5N52tg9zOtD2zHQo6ndeZs5el73W2uesbx3+YxTkIZOQNMNc81Qow139ulxz04DUszpIWm2jlZZKKpKQQErKkAEtmjT6zcBko5tjnxN6hRzXDSfsVf30EZR5034rFINH/tKpW5/7mKrSXDWqlIBBzT7zrbv5732po24LgmFtvvCWWjNNk4hqMs1Mtd52WJthQXDLEfX5GS+wxdkoAS0a1CrMKluoToMWKUFwxuaJD02R7a4Igl6H1OZxygrU+EifIOi2U1Fu4e16BEGrbVGGR2O6WeZ4wSwVT0RWaqsWQdBjZ65NbdEtCE5ZF7P6kvf84KIunVocM2fU6mqNguCqLdlLe0YQNHo1ZnW9k1FB01e7mjESy50SBGctjTNf7qgguGhNzOr8SPnxdWmcA9ZqFQRHlI038a7bgj7bYqN7f9Tug6DD4hi5bXoFt+wau1DttCDlk9jSlvopY/ihkz73qQ/NjJU8IAhOj32693kkaLEkdv+znYvMDztktlIlirOcliUuCh7Z++TNpOOCYQ1ZlBZGuQ16rJcbBRoMCU5IInr4V3sFnb4TYpUSGcf9E747g+9dxjKrRhwkbFSJRh1ZlFJPqA+bCO1OodJGCYqQtBKP/ByjXGS+QguUZor4spSEAg9dNRjrYNgvdiu2QtLNdIavC66qjRGu0qjD7x5mztAf2rS77BvTs8ZQ65rguoXpCOZKolNfjGiRRaOOY4n50a8L7mR10KdTtaRqlxOYpwjdWRTicx6cy1GNO7qj9EpghgR6PYgVLszioCVHmR/oRcKMdIrSnep+LEMY0mFAserMEz7kiiF/a8vhIOV+1Plytwf026PQAgctiO702udPg7rkhSLck5IwVSImhiFteOBh5s6gVj0TWE2YipR76RrclEKlKVkVCnP8i8MUVUi5mXbQZQgvKs8v6DxQbi6GdKUdXDOAGs/9aw4q1aDf9ZEUtaAqvtFNCstU4cJIigY0ocSmPLKbDwptUoxm/SIye1IvNsR02clgsXXo1SiM9IMm57HI63nR+dwo8JqFOK9JpuEM+NqghF2xjfxp979LoUHHRrem6oiWHMi8+Z9EjUuZpt89hnCNRqmDEXUbR+l3R7Rl+zM52K5PcMvO8UtlEfFqjSFei3VkHFzP4WBttJGv4ogX9Zqj8JaPWZnvRx3atGn3q+ezmB+hjmeyP1GbI+o+lvyWWKhenTr1arK8gddE5rttzp7Bx/S93c7Ycsej1I6IOfXYkfuoPx5A+vIeQBb7OBpArtgxYYdRYHNE44OLGtRNMEJ9oDUaoZrzGaHSqHfErcwQeNg7Y4bAMjPV2erLiYfA7GPsG/ZbGY2xg5kx9h6mZcbYkdWnHmPTqLbXcTcmGMSP2zOZQXwESatssMqycZ8S+l3QrFFTbjqcT1EKVJhhjnkqlONO9DGkX38WNv5/4h9pi9b9TcRWMwAAAABJRU5ErkJggg==",
  linkedin: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAABLAAAASwAc4jpUgAAAAd0SU1FB+oJHg0SHKLwb1YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDktMzBUMTM6MTg6MjArMDA6MDBDDe/aAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA5LTMwVDEzOjE4OjIwKzAwOjAwMlBXZgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wOS0zMFQxMzoxODoyOCswMDowMFaqON4AAASgSURBVFjDvdhLbJRVFAfwX6fT1lI0pUJVKrZGLa9iohEQAlETEwILXxGhgC5MBN24c1G3unHjM8aNGMWNbkQ3GhdUjNXEFmOEFvERLQUlYktbwst2OtfF3PloO33MlOiZZL7vO/d859zHuff8/x//sZQVYZNSq84SjRaowXmDep10xpDslQaotdZGq7WolZaSQlZWxpBunTp8a2iuo7vRHu36hRl+f2u3W0PpI6jxiGfcpQKMOO0XfQZcRLWFlmi2SCUY1eUt+50vvu8t3ndWEIw55m2PWq7ePKm4JvPUW26rvY4ZEwTD9llZnPMyW3wXJ6Bbm+XKp7Utt0KbbllBcMjm2ZMmrdVxQdDvDcuLyLIyzV42IAj67JSe2bjVKUFw1PY4w8VIlW26BcEpO2fq1BZ9guBr64tfsChrdQiCE7ZMZ9LikCDocEfJ7uFOXwuC77RM1Tzf+4Kgx91zcg/rHBUE+9QUNj7hrGDA9kn6G9ysqugQ2/ULhu2a3NDgG0HWqxOWttxWB33vJfVFBqjymiD4ZvLu3mNE0G3ZBO1qvwmCjOeLOhZhmR7BiN3jlbUOCMa0TXLzRHLmfB4PjdmlTJuMoF0t4uZf63b84mNhgvEJA/Gux1iRAYJP/IpV1uRVKS8KgrcLDoVqz+n1l/2ai3QP5fYKghdi99X5XPCPrVMYpyyzxtUluIdtRgSfqSONOi04rbvAsNINMgZcJ2U40VQiOGlEkxb1zun1szPj3jvstAa3q8tp73Ne0D5FKt7iU7/62TGtUXNr1HS7x9N+MCIjY9BHVo97r94XgvPuyY2gURp9zhUEqHKzWyCXEaiMmoxn3e+aqK31sHqP+z0+n9OHtCZfplAnhX6XpsyJy/85yZX5tIcS9zlZ54Hk/pJ+pNTl0jRXqS7OjhAmLX/GEQcdT57vTWpB1sVY+fKJNAcZ866tHvWknqhZnEzkhH5wQRbVJQbr86afDGjXHjXVyaSlVCPrQi7AGVksdFVJAfqTJe2Lu7w8OU6usghZZ3IBemVwk/klBRhxId79E5OgLDnJ5luCjN5cgJOG0OzakgKEJLdCQdtCzRj0R36KurFo6kI3J1llEY7kp2hIJyptmgEBlSLlNqlAl0ERzH6lHxtKOjOnl6XWo1+HkN8HnQ7jNg8V1K1ce9k4fWrSlbIEUuaeHnQrDutE3HtDPrRRhV32OzbO/YgT5hkTnI2aUSfVGJP2Z7K4Z/2mQsoJo1hql3KjPpgI6xsipnltAoKosFiTRo1JRchrmlyfWF2tUaMmi6VVeT1CtwJI/3iELa2uRFoNCIbtLGyqicDr6BUBrx8FwXtTAS9W6orDu3NO7vPQ8dD0O2pzhO5zAb93R/d9Nk9vdBm+/2RnCYCxyo6ISk/ZMTNEu0xABoomIEu9EgnIcTtmJiC5FzZHGB/0aLNiFgr1vKORQnUVQ6FystI+wwkJ3OuxSSSwRr0VtnlndhI4PY192DNWxxIymtDYC5iX0Nh8a8k0NicNdjvg71mI+AFPzYWI56XWGhussargU8KgI7p06Jz5U0Ixi1JmgTo3arTAfJyLH0MGDU5Rzf5v+RdASbZ7Sq16qwAAAABJRU5ErkJggg==",
  youtube: "data:image/png;base64,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",
  pinterest: "data:image/png;base64,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"
};

export function signatureText(data: SignatureData) {
  const optional = (label: string, value: string) =>
    hasValue(value) ? `${label}: ${value.trim()}` : null;
  const contact = hasValue(data.whatsapp)
    ? `WhatsApp: ${data.whatsapp.trim()}`
    : hasValue(data.phone)
      ? `Telefone: ${data.phone.trim()}`
      : null;
  const address = hasValue(data.address)
    ? `Endereço: ${data.address.trim()}`
    : null;

  return [
    data.name.trim(),
    hasValue(data.role) ? data.role.trim() : null,
    contact,
    `E-mail: ${data.email.trim()}`,
    address,
    company.site,
    optional("Instagram", data.instagram),
    optional("LinkedIn", data.linkedin),
  ]
    .filter((line): line is string => line !== null && line !== "")
    .join("\n");
}

export function EmailSignature({ data }: { data: SignatureData }) {
  const hasWhatsapp = hasValue(data.whatsapp);
  const hasPhone = hasValue(data.phone);
  const hasContact = hasWhatsapp || hasPhone;
  const hasAddress = hasValue(data.address);


  const instagramLink = hasValue(data.instagram)
    ? instagramHref(data.instagram)
    : "#";
  const linkedinLink = hasValue(data.linkedin)
    ? linkedinHref(data.linkedin)
    : "#";

  const socialLinks = [
    { name: "Instagram", icon: icons.instagram, href: instagramLink },
    { name: "Facebook", icon: icons.facebook, href: company.facebookHref },
    { name: "LinkedIn", icon: icons.linkedin, href: linkedinLink },
    { name: "YouTube", icon: icons.youtube, href: company.youtubeHref },
    { name: "Pinterest", icon: icons.pinterest, href: company.pinterestHref },
  ];

  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      border={0}
      role="presentation"
      style={{
        borderCollapse: "collapse",
        width: "418px",
        minHeight: "118px",
        maxWidth: "100%",
        backgroundColor: "transparent",
      }}
    >
      <tbody>
        <tr>
          {/* BLOCO DE CONTEÚDO PRINCIPAL (ESQUERDA + DIREITA) */}
          <td
            style={{
              backgroundColor: BG_COLOR,
              padding: "14px 0 12px 18px",
              verticalAlign: "top",
              boxSizing: "border-box",
            }}
          >
            <table
              cellPadding={0}
              cellSpacing={0}
              border={0}
              role="presentation"
              style={{
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  {/* COLUNA ESQUERDA: NOME, CARGO, CONTATO E ENDEREÇO */}
                  <td
                    style={{
                      verticalAlign: "top",
                      textAlign: "left",
                      fontFamily: FONT,
                    }}
                  >
                    {/* Nome */}
                    <div
                      style={{
                        fontSize: "15px",
                        lineHeight: "18px",
                        fontWeight: "bold",
                        color: TEXT,
                      }}
                    >
                      {data.name}
                    </div>

                    {/* Cargo */}
                    {hasValue(data.role) && (
                      <div
                        style={{
                          fontSize: "10px",
                          lineHeight: "13px",
                          color: MUTED,
                          paddingTop: "1px",
                        }}
                      >
                        {data.role}
                      </div>
                    )}

                    {/* Espaçamento vertical */}
                    {(hasContact || hasAddress) && (
                      <div
                        style={{
                          height: "8px",
                          lineHeight: "8px",
                          fontSize: "8px",
                        }}
                      >
                        &nbsp;
                      </div>
                    )}

                    {/* Bloco Contato & Endereço */}
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                      role="presentation"
                      style={{ borderCollapse: "collapse" }}
                    >
                      <tbody>
                        {/* Linha WhatsApp */}
                        {hasWhatsapp && (
                          <tr>
                            <td
                              style={{
                                paddingBottom: (hasPhone || hasAddress) ? "2px" : "0px",
                                verticalAlign: "middle",
                              }}
                            >
                              <table
                                cellPadding={0}
                                cellSpacing={0}
                                border={0}
                                role="presentation"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        paddingRight: "5px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={icons.whatsapp}
                                        alt=""
                                        width={12}
                                        height={12}
                                        style={{
                                          display: "block",
                                          border: 0,
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        fontFamily: FONT,
                                        fontSize: "10px",
                                        lineHeight: "14px",
                                        color: TEXT,
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        href={whatsappHref(data.whatsapp)}
                                        style={{
                                          color: TEXT,
                                          textDecoration: "none",
                                        }}
                                      >
                                        {data.whatsapp.trim()}
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}

                        {/* Linha Telefone */}
                        {hasPhone && (
                          <tr>
                            <td
                              style={{
                                paddingBottom: hasAddress ? "2px" : "0px",
                                verticalAlign: "middle",
                              }}
                            >
                              <table
                                cellPadding={0}
                                cellSpacing={0}
                                border={0}
                                role="presentation"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        paddingRight: "5px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={icons.phone}
                                        alt=""
                                        width={12}
                                        height={12}
                                        style={{
                                          display: "block",
                                          border: 0,
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        fontFamily: FONT,
                                        fontSize: "10px",
                                        lineHeight: "14px",
                                        color: TEXT,
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        href={telHref(data.phone)}
                                        style={{
                                          color: TEXT,
                                          textDecoration: "none",
                                        }}
                                      >
                                        {data.phone.trim()}
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}

                        {/* Linha Endereço: texto fixo 'Veja nossos endereços' com link Google Maps */}
                        {hasAddress && (
                          <tr>
                            <td style={{ verticalAlign: "middle" }}>
                              <table
                                cellPadding={0}
                                cellSpacing={0}
                                border={0}
                                role="presentation"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        verticalAlign: "middle",
                                        paddingRight: "5px",
                                        lineHeight: 0,
                                      }}
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={icons.pin}
                                        alt=""
                                        width={12}
                                        height={12}
                                        style={{
                                          display: "block",
                                          border: 0,
                                        }}
                                      />
                                    </td>
                                    <td
                                      style={{
                                        fontFamily: FONT,
                                        fontSize: "10px",
                                        lineHeight: "14px",
                                        color: TEXT,
                                        verticalAlign: "middle",
                                      }}
                                    >
                                      <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address.trim())}`}
                                        style={{
                                          color: TEXT,
                                          textDecoration: "none",
                                        }}
                                      >
                                        Veja nossos endereços
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>

                  {/* COLUNA DIREITA: LOGO BRACCI + ÍCONES SOCIAIS CENTRALIZADOS */}
                  <td
                    style={{
                      verticalAlign: "top",
                      textAlign: "center",
                      width: "125px",
                      paddingRight: "2px",
                      paddingTop: "14px",
                    }}
                  >
                    {/* Logo BRACCI sólida preta */}
                    <div style={{ textAlign: "center", marginBottom: "6px" }}>
                      <a
                        href={company.siteHref}
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={company.logoSrc}
                          alt="BRACCI"
                          width={115}
                          height={20}
                          style={{
                            display: "block",
                            margin: "0 auto",
                            border: 0,
                          }}
                        />
                      </a>
                    </div>

                    {/* Ícones das Redes Sociais com círculos finos pretos */}
                    <table
                      cellPadding={0}
                      cellSpacing={0}
                      border={0}
                      role="presentation"
                      align="center"
                      style={{
                        borderCollapse: "collapse",
                        margin: "0 auto",
                      }}
                    >
                      <tbody>
                        <tr>
                          {socialLinks.map(({ name, icon, href }, idx) => (
                            <td
                              key={name}
                              style={{
                                paddingLeft: idx === 0 ? "0px" : "3px",
                                verticalAlign: "middle",
                                lineHeight: 0,
                              }}
                            >
                              <a
                                href={href}
                                style={{
                                  textDecoration: "none",
                                  display: "inline-block",
                                }}
                                title={name}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={icon}
                                  alt={name}
                                  width={14}
                                  height={14}
                                  style={{
                                    display: "block",
                                    border: 0,
                                  }}
                                />
                              </a>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          {/* COLUNA DA FATIA LATERAL DIREITA: RECORTE ORGÂNICO */}
          <td
            width={42}
            style={{
              width: "42px",
              verticalAlign: "top",
              lineHeight: 0,
              padding: 0,
              margin: 0,
              fontSize: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 42 118"
              preserveAspectRatio="none"
              width={42}
              height="100%"
              style={{
                display: "block",
                width: "42px",
                height: "100%",
                minHeight: "100%",
              }}
            >
              <path
                d="M 0 0 L 10.00 0 L 30.56 1.00 L 31.70 2.00 L 31.93 3.00 L 31.98 4.00 L 32.63 5.00 L 32.82 6.00 L 32.95 7.00 L 33.56 8.00 L 33.93 9.00 L 34.50 10.00 L 34.71 11.00 L 34.95 12.00 L 35.74 13.00 L 35.90 14.00 L 36.51 15.00 L 36.93 16.00 L 37.51 17.00 L 37.75 18.00 L 37.98 19.00 L 38.67 20.00 L 38.85 21.00 L 38.97 22.00 L 39.54 23.00 L 39.91 24.00 L 39.94 25.00 L 39.96 26.00 L 40.57 27.00 L 40.58 28.00 L 40.60 29.00 L 40.62 30.00 L 40.62 31.00 L 40.60 32.00 L 40.58 33.00 L 40.51 34.00 L 39.96 35.00 L 39.94 36.00 L 39.89 37.00 L 39.55 38.00 L 39.00 39.00 L 38.89 40.00 L 38.78 41.00 L 38.51 42.00 L 37.96 43.00 L 37.69 44.00 L 37.50 45.00 L 36.96 46.00 L 36.65 47.00 L 35.97 48.00 L 35.83 49.00 L 35.53 50.00 L 34.89 51.00 L 34.62 52.00 L 33.95 53.00 L 33.86 54.00 L 32.98 55.00 L 32.88 56.00 L 32.73 57.00 L 32.00 58.00 L 31.81 59.00 L 31.57 60.00 L 30.98 61.00 L 30.87 62.00 L 29.96 63.00 L 29.91 64.00 L 29.82 65.00 L 29.58 66.00 L 28.95 67.00 L 28.75 68.00 L 28.56 69.00 L 27.95 70.00 L 27.89 71.00 L 27.00 72.00 L 26.97 73.00 L 26.86 74.00 L 26.79 75.00 L 26.65 76.00 L 25.98 77.00 L 25.99 78.00 L 25.99 79.00 L 25.99 80.00 L 26.00 81.00 L 26.52 82.00 L 26.75 83.00 L 26.88 84.00 L 26.99 85.00 L 27.89 86.00 L 28.59 87.00 L 28.93 88.00 L 29.77 89.00 L 29.94 90.00 L 30.58 91.00 L 30.92 92.00 L 30.96 93.00 L 30.98 94.00 L 31.49 95.00 L 31.56 96.00 L 31.56 97.00 L 31.57 98.00 L 31.56 99.00 L 31.50 100.00 L 31.47 101.00 L 30.98 102.00 L 30.98 103.00 L 30.96 104.00 L 30.97 105.00 L 30.97 106.00 L 30.97 107.00 L 30.96 108.00 L 30.97 109.00 L 30.96 110.00 L 30.97 111.00 L 31.56 112.00 L 31.64 113.00 L 31.88 114.00 L 31.95 115.00 L 10.00 116.00 L 10.00 117.00 L 0 118 Z"
                fill={BG_COLOR}
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
