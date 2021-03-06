package ies.g52.ShopAholytics.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.InheritanceType;


@Entity
@Table(name = "Sensor_Park")
public class SensorPark {
    
    @Id
    @Column(name = "id_sensor")
    @JsonIgnore
    private int id;

    @ManyToOne
    @JoinColumn(name="id_park")
    @JsonIgnore
    private Park park;

    @OneToOne
    @MapsId
    @JoinColumn(name="id_sensor")
    private Sensor sensor;


    public SensorPark(Park park, Sensor sensor) {
        this.sensor=sensor;
        this.park = park;
    }

    public SensorPark(){}
    
    public Sensor getSensor() {
        return this.sensor;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    public void setPark(Park p){
        this.park=p;
    }

    public int getId() {
        return this.id;
    }


    public Park getPark() {
        return this.park;
    }

}
