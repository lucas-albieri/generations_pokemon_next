import { Container, Content, ContentBox, Filter, MovingClouds } from "./style";
import bg from "../../../../../assets/img/rayqBg.png";
import clouds from "../../../../../assets/img/clouds.png";

const HeaderHome = () => {
    return (
        <Container
            style={{
                backgroundImage: 'url(img/rayqBg.png)',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                overflowX: 'hidden',
                height: '100vh',
            }}>

            <Filter />


            <Content>
                <ContentBox>
                    <p
                        color={"white"}
                        style={{
                            fontSize: "7rem",
                            textAlign: "center",
                            color: "white",
                        }}
                    >
                        Pokemon <br /> Generations
                    </p>
                    <p
                        style={{
                            marginTop: "2rem",
                            color: "white",
                        }}
                    >
                        The world of Pokemon 👾
                    </p>
                </ContentBox>
            </Content>

            <MovingClouds
                style={{
                    backgroundImage: `url(img/clouds.png)`,
                }}
            />
        </Container>
    );
}

export default HeaderHome;