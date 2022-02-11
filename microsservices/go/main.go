package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"

	"github.com/lassulfi/imersao6-go/email"
	"github.com/lassulfi/imersao6-go/kafka"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

	gomail "gopkg.in/mail.v2"
)

func main() {
	var emailChan = make(chan email.Email)
	var msgChan = make(chan *ckafka.Message)

	d := gomail.NewDialer("smtp.mailgun.org", 587, "exemplo@schoolofnet.com", "secret")

	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	es := email.NewMailSender()
	es.From = "exemplo@schoolofnet.com"
	es.Dialer = d

	go es.Send(emailChan)

	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9094",
		"client.id":         "emailapp",
		"group.id":          "emailapp",
	}

	topics := []string{"emails"}

	consumer := kafka.NewConsumer(configMap, topics)

	go consumer.Consume(msgChan)

	for msg := range msgChan {
		var input email.Email
		json.Unmarshal(msg.Value, &input)
		fmt.Println("Recebendo mensagem")
		emailChan <- input
	}
}
